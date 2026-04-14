import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

// Importando para ser criado no banco
import quest from "./models/Quests.js";
import Modelagend from "./models/Modelagens.js";
import Desafios from "./models/Desafios.js";
import Rotas from "./models/Rotas.js";
import Usuarios from "./models/Usuarios.js";
import Historia from "./models/Historias.js";

// importando as rotas
import questRoutes from "./routes/questRoutes.js";
import modelagemRoutes from "./routes/modelagemRoutes.js";
import desafioRoutes from "./routes/desafioRoutes.js";
import rotaRoutes from "./routes/rotaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import historiaRoutes from "./routes/historiaRoutes.js";

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// Adicione o prefixo /api/ em todas as rotas
app.use("/api/quest", questRoutes);
app.use("/api/modelagem", modelagemRoutes);
app.use("/api/desafio", desafioRoutes);
app.use("/api/rota", rotaRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/historia", historiaRoutes);

// Iniciando a conexão com o banco de dados do MongoDB
const port = 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/api-memori")
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
  });
