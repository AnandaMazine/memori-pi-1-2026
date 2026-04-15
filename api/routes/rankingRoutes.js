import express from "express";
const rankingRoutes = express.Router();
import rankingController from "../controllers/rankingController.js";

rankingRoutes.get("/", rankingController.getAllRankings);
rankingRoutes.post("/", rankingController.createRanking);
rankingRoutes.delete("/:id", rankingController.deleteRanking);
rankingRoutes.put("/:id", rankingController.updateRanking);
rankingRoutes.get("/:id", rankingController.getOneRanking);

export default rankingRoutes;
