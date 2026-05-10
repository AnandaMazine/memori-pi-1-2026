import capituloService from "../services/capituloService.js";
import { ObjectId } from "mongodb";

const getAllCapitulos = async (req, res) => {
  try {
    const capitulos = await capituloService.getAll();
    res.status(200).json({ capitulos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const createCapitulo = async (req, res) => {
  try {
    const {
      tituloBloco,
      titulo,
      conteudoDialogo,
      conteudo,
      pose,
      ordem,
      idHistoria,
      idPersonagem,
      personagemId,
    } = req.body;

    await capituloService.Create(
      tituloBloco || titulo,
      conteudoDialogo || conteudo,
      pose,
      ordem,
      idHistoria,
      idPersonagem || personagemId,
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const deleteCapitulo = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await capituloService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const updateCapitulo = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const {
        tituloBloco,
        titulo,
        conteudoDialogo,
        conteudo,
        pose,
        ordem,
        idHistoria,
        idPersonagem,
        personagemId,
      } = req.body;

      const capitulo = await capituloService.Update(
        id,
        tituloBloco || titulo,
        conteudoDialogo || conteudo,
        pose,
        ordem,
        idHistoria,
        idPersonagem || personagemId,
      );

      if (!capitulo) {
        return res.status(404).json({ error: "Capítulo não encontrado." });
      }

      res.status(200).json({ capitulo });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const getOneCapitulo = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const capitulo = await capituloService.getOne(id);

      if (!capitulo) {
        res.status(404).json({ error: "Capítulo não encontrado." });
      } else {
        res.status(200).json({ capitulo });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

export default {
  getAllCapitulos,
  createCapitulo,
  deleteCapitulo,
  updateCapitulo,
  getOneCapitulo,
};