import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadRoutes = express.Router();

const uploadDir = path.join("public", "uploads", "midias");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
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

uploadRoutes.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
  }

  res.status(200).json({ url: `/uploads/midias/${req.file.filename}` });
});

export default uploadRoutes;