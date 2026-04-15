import express from "express";
const personagemRoutes = express.Router();
import personagemController from "../controllers/personagemController.js";

personagemRoutes.get("/", personagemController.getAllPersonagens);
personagemRoutes.post("/", personagemController.createPersonagem);
personagemRoutes.delete("/:id", personagemController.deletePersonagem);
personagemRoutes.put("/:id", personagemController.updatePersonagem);
personagemRoutes.get("/:id", personagemController.getOnePersonagem);

export default personagemRoutes;
