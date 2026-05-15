import mongoose from "mongoose";

const capituloSchema = new mongoose.Schema({
    tituloBloco: String,
    conteudoDialogo: String,
    pose: String,
    tipoBloco: {
        type: String,
        default: "Capítulo",
        enum: ["Quest", "Desafio", "Modelagem", "Capítulo"],
    },
    idReferencia: String,
    ordem: Number,
    idHistoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Historia',
        required: true,
    },
    idPersonagem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personagem',
        required: false,
    }
});

const Capitulo = mongoose.model("Capitulo", capituloSchema);

export default Capitulo;