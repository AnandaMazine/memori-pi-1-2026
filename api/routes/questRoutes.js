import express from "express";
const questRoutes = express.Router();
import questController from "../controllers/questController.js";
import {uploadquest} from "../middleware/multerConfig.js";

// import Auth from "../middleware/Auth.js";

// --- Rotas GET e DELETE (não mudam) ---
questRoutes.get("/", questController.getAllQuests);
questRoutes.delete("/:id", questController.deleteQuest);
questRoutes.get("/:id", questController.getOneQuest);

// --- Rotas POST e PUT (CORRIGIDAS) ---

// 1. Rota POST: Adicionado o middleware 'uploadquest'
//    O nome 'capaquest' DEVE ser o mesmo usado no FormData do frontend
questRoutes.post(
    "/", 
    uploadquest.single('capaquest'), 
    questController.createQuest
);

// 2. Rota PUT: Também precisa do middleware para atualizações de imagem
questRoutes.put(
    "/:id", 
    uploadquest.single('capaquest'), 
    questController.updateQuest
);

export default questRoutes;