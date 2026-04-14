import mongoose from "mongoose";

const historiaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  idQuest: Number,
});

const Historia = mongoose.model("Historia", historiaSchema);
export default Historia;