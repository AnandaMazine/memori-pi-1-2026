import modelagemService from "../services/ModelagemService.js"; // Importando o serviço de Modelagens
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
    // Prioritize uploaded files (multer) when present
    const { nomeModelagem, nomeCidade, nomeQuest } = req.body;

    // arquivoQrCode -> uploaded to public/uploads/modelagens/qrcodes/
    let arquivoQrCodePath = req.body.arquivoQrCode; // may be string from frontend when not uploading
    if (req.files && req.files.arquivoQrCode && req.files.arquivoQrCode[0]) {
      arquivoQrCodePath = `/uploads/modelagens/qrcodes/${req.files.arquivoQrCode[0].filename}`;
    }

    // arquivoModelagem -> uploaded to public/uploads/modelagens/temp_zips/
    let arquivoModelagemPath = req.body.arquivoModelagem; // may be string from frontend when not uploading
    if (req.files && req.files.arquivoModelagem && req.files.arquivoModelagem[0]) {
      arquivoModelagemPath = `/uploads/modelagens/temp_zips/${req.files.arquivoModelagem[0].filename}`;
    }

    await modelagemService.Create(
      nomeModelagem,
      nomeCidade,
      arquivoModelagemPath,
      arquivoQrCodePath,
      nomeQuest
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
      const { nomeModelagem, nomeCidade, nomeQuest } = req.body;

      // Handle files first (if uploaded)
      let arquivoQrCodePath = req.body.arquivoQrCode;
      if (req.files && req.files.arquivoQrCode && req.files.arquivoQrCode[0]) {
        arquivoQrCodePath = `/uploads/modelagens/qrcodes/${req.files.arquivoQrCode[0].filename}`;
      }

      let arquivoModelagemPath = req.body.arquivoModelagem;
      if (req.files && req.files.arquivoModelagem && req.files.arquivoModelagem[0]) {
        arquivoModelagemPath = `/uploads/modelagens/temp_zips/${req.files.arquivoModelagem[0].filename}`;
      }

      const modelagem = await modelagemService.Update(
        id,
        nomeModelagem,
        nomeCidade,
        arquivoModelagemPath,
        arquivoQrCodePath,
        nomeQuest
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

// Exportando o módulo
export default {
  getAllModelagens,
  createModelagem,
  deleteModelagem,
  updateModelagem,
  getOneModelagem,
};
