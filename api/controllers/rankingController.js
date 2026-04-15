import rankingService from "../services/rankingService.js";
import { ObjectId } from "mongodb";

// Função para listar todas os Rankings
const getAllRankings = async (req, res) => {
  try {
    const rankings = await rankingService.getAll(); // "Envelopa" a resposta para o frontend
    res.status(200).json({ rankings: rankings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar um novo Ranking
const createRanking = async (req, res) => {
  try {
    // Extrai os campos de texto do req.body
    const { idUsuario, idPontuacao, pontosTotal, posicao } = req.body; // 2. Chama o service com os dados corretos

    await rankingService.Create(
      idUsuario, idPontuacao, pontosTotal, posicao
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar um Ranking
const deleteRanking = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await rankingService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar um Ranking
const updateRanking = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {idUsuario, idPontuacao, pontosTotal, posicao } =
        req.body;
      const ranking = await rankingService.Update(
        id,
        idUsuario, idPontuacao, pontosTotal, posicao
      );
      res.status(200).json({ ranking });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para buscar um único Ranking
const getOneRanking = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const ranking = await rankingService.getOne(id);
      if (!ranking) {
        res.status(404).json({ error: "Ranking não encontrada." });
      } else {
        res.status(200).json({ ranking });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor ." });
  }
};

// Exporta todas as funções
export default {
  getAllRankings,
  createRanking,
  deleteRanking,
  updateRanking,
  getOneRanking,
};
