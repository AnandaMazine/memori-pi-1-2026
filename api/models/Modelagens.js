import mongoose from "mongoose";

const modelagemSchema = new mongoose.Schema({
    nomeModelagem: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    descricaoModelagem: { type: String, required: true },
    imagemModelagem: { type: String, default: "" }
});

const Modelagem = mongoose.model("Modelagem", modelagemSchema);

export default Modelagem;