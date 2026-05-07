import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  idPontuacao: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pontuacao",
    required: true,
  },
  pontosTotal: Number,
  posicao: Number,
});
// Ranking deve ser por Quest
const Ranking = mongoose.model("Ranking", rankingSchema);
export default Ranking;
