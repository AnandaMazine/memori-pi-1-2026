import mongoose from "mongoose";

const historiaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  idQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    required: false,
  },
  idCapitulo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Capitulo",
    required: false,
  },
  idModelagem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Modelagem",
    required: false,
  },
  idDesafio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Desafio",
    required: false,
  },
});

const Historia = mongoose.model("Historia", historiaSchema);

export default Historia;