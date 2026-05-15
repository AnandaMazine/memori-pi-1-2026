import mongoose from "mongoose";

const personagemSchema = new mongoose.Schema({
  nomePersonagem: String,
  descricao: String,
  poses: [mongoose.Schema.Types.Mixed],
});

const Personagem = mongoose.model("Personagem", personagemSchema);

export default Personagem;