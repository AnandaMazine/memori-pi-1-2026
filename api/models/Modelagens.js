import mongoose from "mongoose";

const modelagemSchema = new mongoose.Schema({
    nomeModelagem: String,
    nomeCidade: String,
    arquivoModelagem: String,
    arquivoQrCode: String,
    idQuest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quest',
        required: true,
    }
});
const Modelagem = mongoose.model("Modelagem", modelagemSchema);
export default Modelagem;