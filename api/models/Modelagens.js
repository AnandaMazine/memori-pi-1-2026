import mongoose from "mongoose";

const modelagensSchema = new mongoose.Schema({
    nomeModelagem: String,
    nomeCidade: String,
    arquivoModelagem: String,
    arquivoQrCode: String,
    nomeQuest:{
        type: String,
        ref: 'quest'
    }
});
const Modelagens = mongoose.model("Modelagens", modelagensSchema);
export default Modelagens;