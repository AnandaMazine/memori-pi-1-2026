import Pontuacao from "../models/Pontuacoes.js";

class pontuacaoService {
  async getAll() {
    try {
      const pontuacoes = await Pontuacao.find();
      return pontuacoes;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(usuario, desafio, pontos, data) {
    try {
      const newPontuacao = new Pontuacao({
        usuario,
        desafio,
        pontos,
        data,
      });
      await newPontuacao.save();
      return newPontuacao;
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Pontuacao.findByIdAndDelete(id);
      console.log(`Pontuacao com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, usuario, desafio, pontos, data) {
    try {
      const pontuacao = await Pontuacao.findByIdAndUpdate(
        id,
        {
          usuario,
          desafio,
          pontos,
          data,
        },
        { new: true },
      );
      console.log(`Pontuacao com id ${id} atualizada com sucesso!`);
      return pontuacao;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const pontuacao = await Pontuacao.findOne({ _id: id });
      return pontuacao;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new pontuacaoService();
