import mongoose from "mongoose";

const historiaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  idQuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
    required: true,
  },
});

const Historia = mongoose.model("Historia", historiaSchema);
export default Historia;