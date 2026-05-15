import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  username: { type: String, required: true },
  pontosTotal: Number,
  posicao: Number,
});

const Ranking = mongoose.model("Ranking", rankingSchema);

export default Ranking;