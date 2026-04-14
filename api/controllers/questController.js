import questService from "../services/questService.js"; // Importando o serviço de quests
import { ObjectId } from "mongodb";

// Função para listar quests
const getAllQuests = async (req, res) => {
  try {
    const quests = await questService.getAll();
    res.status(200).json({ quests: quests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar um novo quest (CORRIGIDA)
const createQuest = async (req, res) => {
  try {
  
  console.log("Recebendo requisição POST para createquest.");
        console.log("req.body:", req.body); 
        console.log("req.file:", req.file); 
    const {
      nomeQuest,
      latitudeQuest,
      longitudeQuest,
      descricaoQuest,
      imagemQuest,
      imagemQrCode,
    } = req.body;

      // CORREÇÃO AQUI: Adicione a subpasta '/quests/' ao caminho
    const imagemquest = req.file ? `/uploads/quests/${req.file.filename}` : null;

    await questService.Create(
      nomeQuest,
      latitudeQuest,
      longitudeQuest,
      descricaoQuest,
      imagemQuest,
      imagemQrCode,
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar quests
const deleteQuest = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await questService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Funçãpo para atualizar quests
const updateQuest = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "A ID enviada é inválida." });
    }

    const {
      nomeQuest,
      latitudeQuest,
      longitudeQuest,
      descricaoQuest,
      imagemQuest,
      imagemQrCode,
    } = req.body;

    let imagemquest;
    if (req.file) {
      imagemquest = `/uploads/quests/${req.file.filename}`;
    } else if (req.body.imagem_existente !== undefined && req.body.imagem_existente !== "") {
      imagemquest = req.body.imagem_existente;
    } else {
      imagemquest = undefined;
    }

    console.log("updatequest -> id:", id);
    console.log("updatequest -> body:", req.body);
    console.log("updatequest -> file:", req.file);

    const quest = await questService.Update(
      id,
      nomeQuest,
      latitudeQuest,
      longitudeQuest,
      descricaoQuest,
      imagemQuest,
      imagemQrCode,
    );

    if (!quest) {
      return res.status(404).json({ error: "quest não encontrado." });
    }

    res.status(200).json({ quest });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função buscar um único quest
const getOneQuest = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const quest = await questService.getOne(id);
      if (!quest) {
        res.status(404).json({ error: "Quest não encontrado." });
      } else {
        res.status(200).json({ quest });
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
  getAllQuests,
  createQuest,
  deleteQuest,
  updateQuest,
  getOneQuest,
};
