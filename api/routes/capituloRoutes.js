import express from "express";
const capituloRoutes = express.Router();
import capituloController from "../controllers/capituloController.js";

capituloRoutes.get("/", capituloController.getAllCapitulos);
capituloRoutes.post("/", capituloController.createCapitulo);
capituloRoutes.delete("/:id", capituloController.deleteCapitulo);
capituloRoutes.put("/:id", capituloController.updateCapitulo);
capituloRoutes.get("/:id", capituloController.getOneCapitulo);

export default capituloRoutes;