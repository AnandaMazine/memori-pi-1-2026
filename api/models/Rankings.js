import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  idUsuario: Number,
  idPontuacao: Number,
  pontosTotal: Number,
  posicao: Number,
});

const Ranking = mongoose.model("Ranking", rankingSchema);
export default Ranking;
