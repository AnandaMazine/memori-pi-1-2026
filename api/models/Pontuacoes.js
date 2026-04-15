import mongoose from "mongoose";

const pontuacaoSchema = new mongoose.Schema({
  idUsuario: Number,
  idDesafio: Number,
  dataInicio: Date,
  dataFim: Date,
  pontosTotal: Number,
});

const Pontuacao = mongoose.model("Pontuacao", pontuacaoSchema);
export default Pontuacao;
