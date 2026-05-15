import mongoose from "mongoose";

const modelagemSchema = new mongoose.Schema({
    nomeModelagem: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    descricaoModelagem: { type: String, required: true },
    imagemModelagem: { type: String, default: "" },
    modeloURL: { type: String, default: "" },
    tipoModelo: { type: String, enum: ["gltf", "glb", "obj"], default: "gltf" }
});

const Modelagem = mongoose.model("Modelagem", modelagemSchema);

export default Modelagem;