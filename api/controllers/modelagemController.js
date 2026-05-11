import modelagemService from "../services/modelagemService.js"; // Importando o serviço de Modelagens
import { ObjectId } from "mongodb";

// Função para listar Modelagens
const getAllModelagens = async (req, res) => {
  try {
    const modelagens = await modelagemService.getAll();
    res.status(200).json({ modelagens: modelagens });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para criar uma nova Modelagem
const createModelagem = async (req, res) => {
  try {
    const {
      nomeModelagem,
      latitude,
      longitude,
      descricaoModelagem,
      imagemModelagem,
    } = req.body;

    await modelagemService.Create(
      nomeModelagem,
      latitude,
      longitude,
      descricaoModelagem,
      imagemModelagem,
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar Modelagens
const deleteModelagem = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await modelagemService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para atualizar Modelagens
const updateModelagem = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        nomeModelagem,
        latitude,
        longitude,
        descricaoModelagem,
        imagemModelagem,
      } = req.body;

      const modelagem = await modelagemService.Update(
        id,
        nomeModelagem,
        latitude,
        longitude,
        descricaoModelagem,
        imagemModelagem,
      );
      res.status(200).json({ modelagem });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

const getOneModelagem = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const modelagem = await modelagemService.getOne(id);
      if (!modelagem) {
        res.status(404).json({ error: "Modelagem não encontrada." });
      } else {
        res.status(200).json({ modelagem });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

export default {
  getAllModelagens,
  createModelagem,
  deleteModelagem,
  updateModelagem,
  getOneModelagem,
};
