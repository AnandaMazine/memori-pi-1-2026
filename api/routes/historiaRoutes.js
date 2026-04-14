import express from "express";
const historiaRoutes = express.Router();
import historiaController from "../controllers/historiaController.js";

historiaRoutes.get("/", historiaController.getAllHistoria);
historiaRoutes.post("/", historiaController.createHistoria);
historiaRoutes.delete("/:id", historiaController.deleteHistoria);
historiaRoutes.put("/:id", historiaController.updateHistoria);
historiaRoutes.get("/:id", historiaController.getOneHistoria);

export default historiaRoutes;
