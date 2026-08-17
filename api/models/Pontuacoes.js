import mongoose from "mongoose";

const pontuacaoSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  desafio: { type: String, required: true },
  pontos: { type: Number, required: true },
  data: { type: String, required: true },
});

const Pontuacao = mongoose.model("Pontuacao", pontuacaoSchema);
export default Pontuacao;