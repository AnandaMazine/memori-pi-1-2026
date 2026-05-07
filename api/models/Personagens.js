import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
  nomePersonagem: String,
  descricao: String,
  imagem: String, // Array de imagens, com poses diferentes
  idHistoria: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Historia",
    required: true,
  }, // Remover
});

const Personagem = mongoose.model("Personagem", personagemSchema);
export default Personagem;