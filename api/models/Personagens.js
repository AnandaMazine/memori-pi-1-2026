import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
  nomePersonagem: String,
  descricao: String,
  imagem: String,
  idHistoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Historia",
    required: true,
  },
});

const Personagem = mongoose.model("Personagem", personagemSchema);
export default Personagem;