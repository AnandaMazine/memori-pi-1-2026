import personagemService from "../services/personagemService.js";
import { ObjectId } from "mongodb";

// Função para listar todas os Personagens
const getAllPersonagens = async (req, res) => {
  try {
    const personagem = await personagemService.getAll();
    res.status(200).json({ personagem: personagem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar um novo Personagem
const createPersonagem = async (req, res) => {
  try {
    const { nomePersonagem, descricao, poses, imagem } = req.body;
    const posesNormalizadas = Array.isArray(poses)
      ? poses.filter(Boolean)
      : imagem
      ? [imagem]
      : [];

    await personagemService.Create(nomePersonagem, descricao, posesNormalizadas);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar um Personagem
const deletePersonagem = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await personagemService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar um Personagem
const updatePersonagem = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const { nomePersonagem, descricao, poses, imagem } = req.body;
      const posesNormalizadas = Array.isArray(poses)
        ? poses.filter(Boolean)
        : imagem
        ? [imagem]
        : undefined;

      const personagem = await personagemService.Update(id, nomePersonagem, descricao, posesNormalizadas);

      res.status(200).json({ personagem });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para buscar um único Personagem
const getOnePersonagem = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const personagem = await personagemService.getOne(id);

      if (!personagem) {
        res.status(404).json({ error: "Personagem não encontrado." });
      } else {
        res.status(200).json({ personagem });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor ." });
  }
};

export default {getAllPersonagens, createPersonagem, deletePersonagem, updatePersonagem, getOnePersonagem};
