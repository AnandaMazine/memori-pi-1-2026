import mongoose from "mongoose";

const pontuacaoSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    required: true,
  },
  idDesafio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Desafio",
    required: true,
  },
  dataInicio: Date,
  dataFim: Date,
  pontosTotal: Number,
});

const Pontuacao = mongoose.model("Pontuacao", pontuacaoSchema);
export default Pontuacao;
