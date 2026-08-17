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

  async Create(usuario, username, pontosTotal, posicao) {
    try {
      const newRanking = new Ranking({
        usuario,
        username,
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

  async Update(id, usuario, username, pontosTotal, posicao) {
    try {
      const ranking = await Ranking.findByIdAndUpdate(
        id,
        {
          usuario,
          username,
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

  async getRankingOrdenado() {
  try {
    const rankings = await Ranking.find().sort({ pontosTotal: -1 });
    return rankings;
    } catch (error) {
    console.log(error);
    throw error;
    }
  }
}



export default new RankingService();
