import Ranking from "../models/Rankings.js";

class RankingService {
  async getAll() {
    try {
      const rankings = await Ranking.find();
      return rankings;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(idUsuario, idPontuacao, pontosTotal, posicao) {
    try {
      const newRanking = new Ranking({
        idUsuario,
        idPontuacao,
        pontosTotal,
        posicao,
      });
      await newRanking.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Ranking.findByIdAndDelete(id);
      console.log(`Ranking com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, idUsuario, idPontuacao, pontosTotal, posicao) {
    try {
      const ranking = await Ranking.findByIdAndUpdate(
        id,
        {
          idUsuario,
          idPontuacao,
          pontosTotal,
          posicao,
        },
        { new: true },
      );
      console.log(`Ranking com id ${id} atualizada com sucesso!`);
      return ranking;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const ranking = await Ranking.findOne({ _id: id });
      return ranking;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RankingService();
