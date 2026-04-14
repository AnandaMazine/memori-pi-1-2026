import historiaService from "../services/historiaService.js";
import { ObjectId } from "mongodb";

// Função para listar todas as Histórias
const getAllHistoria = async (req, res) => {
  try {
    const historia = await historiaService.getAll();
    res.status(200).json({ historia: historia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar uma nova História
const createHistoria = async (req, res) => {
  try {
    const { titulo, descricao, idQuest } = req.body;

    await historiaService.Create(titulo, descricao, idQuest);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar uma História
const deleteHistoria = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await historiaService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar uma História
const updateHistoria = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const { titulo, descricao, idQuest } = req.body;

      const historia = await historiaService.Update(
        id,
        titulo,
        descricao,
        idQuest,
      );

      res.status(200).json({ historia });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para buscar uma única História
const getOneHistoria = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const historia = await historiaService.getOne(id);

      if (!historia) {
        res.status(404).json({ error: "História não encontrada." });
      } else {
        res.status(200).json({ historia });
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
  getAllHistoria,
  createHistoria,
  deleteHistoria,
  updateHistoria,
  getOneHistoria,
};
