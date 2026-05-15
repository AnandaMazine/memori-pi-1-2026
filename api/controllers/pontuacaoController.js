import pontuacaoService from "../services/pontuacaoService.js";
import { ObjectId } from "mongodb";

// Função para listar todas as Pontuações
const getAllPontuacoes = async (req, res) => {
  try {
    const pontuacoes = await pontuacaoService.getAll(); // "Envelopa" a resposta para o frontend
    res.status(200).json({ pontuacoes: pontuacoes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar uma nova Pontuacao
const createPontuacao = async (req, res) => {
  try {
    // Extrai os campos de texto do req.body
    const { usuario, desafio, pontos, data } = req.body;

    await pontuacaoService.Create(
      usuario,
      desafio,
      pontos,
      data,
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar uma Pontuacao
const deletePontuacao = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await pontuacaoService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar uma Pontuacao
const updatePontuacao = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const { usuario, desafio, pontos, data } =
        req.body;
      const pontuacao = await pontuacaoService.Update(
        id,
        usuario,
        desafio,
        pontos,
        data,
      );
      res.status(200).json({ pontuacao });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para buscar uma única Pontuacao
const getOnePontuacao = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const pontuacao = await pontuacaoService.getOne(id);
      if (!pontuacao) {
        res.status(404).json({ error: "Pontuacao não encontrada." });
      } else {
        res.status(200).json({ pontuacao });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor ." });
  }
};

export default {
  getAllPontuacoes,
  createPontuacao,
  deletePontuacao,
  updatePontuacao,
  getOnePontuacao,
};
