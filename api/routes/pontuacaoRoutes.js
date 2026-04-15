import express from "express";
const pontuacaoRoutes = express.Router();
import pontuacaoController from "../controllers/pontuacaoController.js";

pontuacaoRoutes.get("/", pontuacaoController.getAllPontuacoes);
pontuacaoRoutes.post("/", pontuacaoController.createPontuacao);
pontuacaoRoutes.delete("/:id", pontuacaoController.deletePontuacao);
pontuacaoRoutes.put("/:id", pontuacaoController.updatePontuacao);
pontuacaoRoutes.get("/:id", pontuacaoController.getOnePontuacao);

export default pontuacaoRoutes;