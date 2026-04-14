import desafioService from "../services/desafioService.js";
import { ObjectId } from "mongodb";

//Função para listar todos os Desafios
const getAllDesafios = async (req, res) => {
  try {
    const desafios = await desafioService.getAll();
    res.status(200).json({ desafios: desafios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para criar um Desafio
const createDesafio = async (req, res) => {
  try {
    const {
      pergunta,
      tipoDesafio,
      dificuldade,
      tempoLimite,
      estadoInicial,
      estadoCorreto,
      numeroPeca,
    } = req.body;
    await desafioService.Create(
      pergunta,
      tipoDesafio,
      dificuldade,
      tempoLimite,
      estadoInicial,
      estadoCorreto,
      numeroPeca,
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar um Desafio
const deleteDesafio = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await desafioService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar Desafio
const updateDesafio = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        pergunta,
        tipoDesafio,
        dificuldade,
        tempoLimite,
        estadoInicial,
        estadoCorreto,
        numeroPeca,
      } = req.body;
      const desafio = await desafioService.Update(
        id,
        pergunta,
        tipoDesafio,
        dificuldade,
        tempoLimite,
        estadoInicial,
        estadoCorreto,
        numeroPeca,
      );
      res.status(200).json({ desafio });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const getOneDesafio = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const desafio = await desafioService.getOne(id);
      if (!desafio) {
        res.status(400).json({ error: "Desafio não encontrado. " });
      } else {
        res.status(200).json({ desafio });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
export default {
  getAllDesafios,
  createDesafio,
  deleteDesafio,
  updateDesafio,
  getOneDesafio,
};
