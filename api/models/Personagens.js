import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
  nomePersonagem: String,
  descricao: String,
  poses: [String],
});

const Personagem = mongoose.model("Personagem", personagemSchema);

export default Personagem;