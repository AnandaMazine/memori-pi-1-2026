import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
  nomePersonagem: String,
  descricao: String,
  imagem: String,
  idHistoria: Number,
});

const Personagem = mongoose.model("Personagem", personagemSchema);
export default Personagem;