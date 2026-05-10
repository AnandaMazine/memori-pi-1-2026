import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
    nomeQuest: String,
    latitudeQuest: Number,
    longitudeQuest: Number,
    descricaoQuest: String,
    imagemQuest: String,
});

const Quest = mongoose.model("Quest", questSchema);

export default Quest;