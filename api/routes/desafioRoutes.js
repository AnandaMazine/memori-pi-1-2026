import express from "express";
const desafioRoutes = express.Router();
import desafioController from "../controllers/desafioController.js";
import Auth from "../middleware/Auth.js";
 
desafioRoutes.get("/", desafioController.getAllDesafios);
desafioRoutes.post("/", desafioController.createDesafio);
desafioRoutes.delete("/:id", desafioController.deleteDesafio);
desafioRoutes.put("/:id", desafioController.updateDesafio);
desafioRoutes.get("/:id", desafioController.getOneDesafio);
 
export default desafioRoutes;