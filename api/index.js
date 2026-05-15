import dotenv from "dotenv";

dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const workspacePublicDir = path.resolve(process.cwd(), "..", "public");
app.use(express.static(workspacePublicDir));

// Importando models (força criação no Mongo)
import "./models/Quests.js";
import "./models/Modelagens.js";
import "./models/Desafios.js";
import "./models/Usuarios.js";
import "./models/Historias.js";
import "./models/Personagens.js";
import "./models/Capitulos.js";
import "./models/Pontuacoes.js";
import "./models/Rankings.js";

// Importando rotas
import questRoutes from "./routes/questRoutes.js";
import modelagemRoutes from "./routes/modelagemRoutes.js";
import desafioRoutes from "./routes/desafioRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import historiaRoutes from "./routes/historiaRoutes.js";
import capituloRoutes from "./routes/capituloRoutes.js";
import personagemRoutes from "./routes/personagemRoutes.js";
import pontuacaoRoutes from "./routes/pontuacaoRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Rotas com prefixo /api
app.use("/api/quest", questRoutes);
app.use("/api/modelagem", modelagemRoutes);
app.use("/api/desafio", desafioRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/historia", historiaRoutes);
app.use("/api/capitulo", capituloRoutes);
app.use("/api/personagem", personagemRoutes);
app.use("/api/pontuacao", pontuacaoRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/upload", uploadRoutes);

// Porta
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

// 🔌 Conexão com MongoDB
console.log("Tentando conectar ao MongoDB...");

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch((error) => {
    console.error("ERRO:", error.message);
  });
