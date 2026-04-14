import mongoose from "mongoose";

const desafioSchema = new mongoose.Schema({
    pergunta: String,
    tipoDesafio: String,
    dificuldade: Number,
    tempoLimite: Number,
    estadoInicial: String,
    estadoCorreto: String,
    numeroPeca: Number,
});
const Desafio = mongoose.model("Desafio", desafioSchema);
export default Desafio;