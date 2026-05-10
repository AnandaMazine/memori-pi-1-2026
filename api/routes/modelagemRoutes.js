import express from "express";
const modelagemRoutes = express.Router();
import modelagemController from "../controllers/modelagemController.js";

modelagemRoutes.get("/", modelagemController.getAllModelagens);
modelagemRoutes.delete("/:id", modelagemController.deleteModelagem);
modelagemRoutes.get("/:id", modelagemController.getOneModelagem);
modelagemRoutes.post("/", modelagemController.createModelagem);
modelagemRoutes.put("/:id", modelagemController.updateModelagem);

export default modelagemRoutes;