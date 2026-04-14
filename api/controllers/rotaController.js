import rotaService from "../services/RotaService.js"; // Importando o RotaService
import { ObjectId } from "mongodb";

// Função para listar todas as Rotas
const getAllRotas = async (req, res) => {
  try {
    const rotas = await rotaService.getAll();
    // "Envelopa" a resposta para o frontend
    res.status(200).json({ rotas: rotas }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para criar uma nova Rota
const createRota = async (req, res) => {
  try {
    // Extrai os campos de texto do req.body
    const {
      tituloRota,
      cidadeLocalizada,
      longitudeRota,
      latituteRota, // Mantendo a grafia do seu service
      descricaoRota,
    } = req.body;

    // 1. Pega o caminho do arquivo salvo pelo multer (assumindo que a pasta é 'rotas')
    const imagemCapa = req.file ? `/uploads/rotas/${req.file.filename}` : null;

    // 2. Chama o service com os dados corretos
    await rotaService.Create(
      tituloRota,
      cidadeLocalizada,
      longitudeRota,
      latituteRota,
      imagemCapa,
      descricaoRota
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar uma Rota
const deleteRota = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await rotaService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para atualizar uma Rota
const updateRota = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        tituloRota,
        cidadeLocalizada,
        longitudeRota,
        latituteRota,
        descricaoRota,
      } = req.body;

      // Lógica para imagem (igual ao questController)
      let imagemCapa = req.body.imagem_existente || null; 
      if (req.file) {
        imagemCapa = `/uploads/rotas/${req.file.filename}`;
      }

      const rota = await rotaService.Update(
        id,
        tituloRota,
        cidadeLocalizada,
        longitudeRota,
        latituteRota,
        imagemCapa,
        descricaoRota
      );
      res.status(200).json({ rota }); // Retorna a rota atualizada
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " })  ;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor. " });
  }
};

// Função para buscar uma única Rota
const getOneRota = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const rota = await rotaService.getOne(id);
      if (!rota) {
        res.status(404).json({ error: "Rota não encontrada." });
      } else {
        res.status(200).json({ rota }); // Retorna a rota encontrada
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
  getAllRotas,
  createRota,
  deleteRota,
  updateRota,
  getOneRota,
};