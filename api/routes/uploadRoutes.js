import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

const uploadRoutes = express.Router();

const workspacePublicDir = path.resolve(process.cwd(), "..", "public");
const uploadDir = path.join(workspacePublicDir, "uploads", "midias");
const model3DDir = path.join(workspacePublicDir, "uploads", "modelagens", "models_3d");
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(model3DDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Storage para modelos 3D
const storage3D = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, model3DDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Apenas imagens são permitidas."));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Upload para modelos 3D
const upload3D = multer({
  storage: storage3D,
  fileFilter: (_req, file, cb) => {
    const allowedMimes = [
      'model/gltf-binary',
      'application/octet-stream',
    ];
    const allowedExtensions = ['.glb'];
    
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
      return;
    }

    cb(new Error("Nesta rota apenas .glb é permitido. Para .gltf com dependências, envie um .zip na rota /3d-zip."));
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

// Upload de ZIP contendo modelagem (extrai estrutura preservando paths relativos)
const storageZip = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, model3DDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const uploadZip = multer({
  storage: storageZip,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".zip") {
      cb(null, true);
      return;
    }
    cb(new Error("Apenas arquivos .zip são permitidos."));
  },
  limits: { fileSize: 200 * 1024 * 1024 },
});

uploadRoutes.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
  }

  res.status(200).json({ url: `/uploads/midias/${req.file.filename}` });
});

// Rota para upload de modelos 3D
uploadRoutes.post("/3d", upload3D.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
  }

  // Retornar URL que usa a rota de API para servir o modelo
  const fileName = req.file.filename;
  // Retorna uma URL relativa que o frontend (Next.js) pode redirecionar para o backend
  const apiUrl = `/uploads/modelagens/models_3d/${fileName}`;
  
  res.status(200).json({ url: apiUrl });
});

// Rota para upload de ZIP de modelagem 3D (extrai em extracted/<unique>/)
uploadRoutes.post("/3d-zip", uploadZip.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
  }

  try {
    const zipPath = path.join(model3DDir, req.file.filename);
    const uniqueFolder = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extractDir = path.join(workspacePublicDir, "uploads", "modelagens", "extracted", uniqueFolder);
    fs.mkdirSync(extractDir, { recursive: true });

    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractDir, true);

    // procura por um arquivo .gltf dentro da pasta extraída
    const walk = (dir) => {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const it of items) {
        const p = path.join(dir, it.name);
        if (it.isDirectory()) {
          const found = walk(p);
          if (found) return found;
        } else if (it.isFile() && path.extname(it.name).toLowerCase() === ".gltf") {
          return p;
        }
      }
      return null;
    };

    const foundGltfPath = walk(extractDir);
    if (!foundGltfPath) {
      return res.status(400).json({ error: "Nenhum arquivo .gltf encontrado no ZIP." });
    }

    // Montar URL relativa para uso pelo frontend
    const relative = path.relative(workspacePublicDir, foundGltfPath).split(path.sep).join("/");
    const apiUrl = `/${relative}`;

    // Opcional: remover arquivo zip enviado
    try { fs.unlinkSync(zipPath); } catch (e) { /* ignore */ }

    res.status(200).json({ url: apiUrl });
  } catch (err) {
    console.error("Erro ao extrair ZIP:", err);
    res.status(500).json({ error: "Falha ao processar ZIP." });
  }
});

export default uploadRoutes;