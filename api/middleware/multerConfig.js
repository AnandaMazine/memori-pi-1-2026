// api/middleware/multerConfig.js
import multer from 'multer';
import path from 'path';
import fs from 'fs'; // Import fs for creating directories

// --- Reusable Filters/Generators ---
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas imagens são permitidas.'), false);
    }
};

const zipFilter = (req, file, cb) => {
    // Allows standard zip MIME types
    if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos .zip são permitidos para o modelo 3D.'), false);
    }
};

const generateFilename = (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Use fieldname in the unique name to help differentiate if needed
    return file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
};

// --- Existing Storages ---

// quests
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/quests/');
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file));
    }
});

// Rotas
const rotasStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/rotas/');
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file));
    }
});

// Modelagens - QR Codes (Final Destination)
const qrCodeStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/modelagens/qrcodes/'); 
    },
    filename: (req, file, cb) => {
        cb(null, generateFilename(file));
    }
});

const qrCodeDir = 'public/uploads/modelagens/qrcodes/';
const tempZipDir = 'public/uploads/modelagens/temp_zips/';  

fs.mkdirSync(qrCodeDir, { recursive: true });
fs.mkdirSync(tempZipDir, { recursive: true });


const uploadquest = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

const uploadRota = multer({
    storage: rotasStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

const uploadQRCode = multer({
    storage: qrCodeStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
});

const uploadModelagem = multer({
   storage: multer.diskStorage({
        destination: function (req, file, cb) {
            // Send QR codes to their final directory
            if (file.fieldname === "arquivoQrCode") { // Field name from your service
                cb(null, qrCodeDir);
            // Send ZIP files to the temporary directory
            } else if (file.fieldname === "arquivoModelagem") { // Field name from your service
                cb(null, tempZipDir); // Save ZIP here temporarily
            } else {
                // Handle unexpected fields
                cb(new Error("Campo de arquivo desconhecido para modelagem"), null);
            }
        },
        filename: function (req, file, cb) {
            // Use the reusable function for unique names
            cb(null, generateFilename(file));
        }
    }),
   fileFilter: function (req, file, cb) { // Apply filter based on fieldname
       if (file.fieldname === "arquivoQrCode") {
           imageFilter(req, file, cb); // Must be an image
       } else if (file.fieldname === "arquivoModelagem") {
            zipFilter(req, file, cb); // Must be a zip
       } else {
           cb(new Error("Campo de arquivo desconhecido"), false); // Reject other fields
       }
   },
   limits: { fileSize: 50 * 1024 * 1024 } 
}).fields([ 
   { name: 'arquivoQrCode', maxCount: 1 },  
   { name: 'arquivoModelagem', maxCount: 1 }
]);


// --- Updated Exports ---
export {
    uploadquest,
    uploadRota,
    uploadQRCode,     // Keep this if you use it elsewhere
    uploadModelagem   // <-- Add the new one for the modelagem form
};