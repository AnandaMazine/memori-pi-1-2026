import mongoose from "mongoose";

const historiaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  idQuest: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
  // Referenciar todos os capitulos dessa história
  // Dentro de história deve conter todas as modelagens associadas a ela e todos os seus desafios
});

const Historia = mongoose.model("Historia", historiaSchema);
export default Historia;

// Capitulos deve ter:
// Falas do Personagem (Explicação), que deve ser um vetor 
// História que ele deve estar associado
// Ordem do capitulo
// Id Personagem

