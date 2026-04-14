import Desafio from "../models/Desafios.js";

class desafioService {
  async getAll() {
    try {
      const desafios = await Desafio.find();
      return desafios;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(
    pergunta,
    tipoDesafio,
    dificuldade,
    tempoLimite,
    estadoInicial,
    estadoCorreto,
    numeroPeca,
  ) {
    try {
      const newDesafio = new Desafio({
        pergunta,
        tipoDesafio,
        dificuldade,
        tempoLimite,
        estadoInicial,
        estadoCorreto,
        numeroPeca,
      });
      await newDesafio.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Desafio.findByIdAndDelete(id);
      console.log(`Desafio com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(
    id,
    pergunta,
    tipoDesafio,
    dificuldade,
    tempoLimite,
    estadoInicial,
    estadoCorreto,
    numeroPeca,
  ) {
    try {
      const desafio = await Desafio.findByIdAndUpdate(
        id,
        {
          pergunta,
          tipoDesafio,
          dificuldade,
          tempoLimite,
          estadoInicial,
          estadoCorreto,
          numeroPeca,
        },
        { new: true },
      );
      console.log(`Desafio com id ${id} atualizada com sucesso!`);
      return desafio;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const desafio = await Desafio.findOne({ _id: id });
      return desafio;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new desafioService();
