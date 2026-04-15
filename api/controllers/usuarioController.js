import usuarioService from "../services/usuarioService.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const jwtSecret = "memori"; 

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAll();
    res.status(200).json({ usuarios: usuarios });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { 
      nome, 
      nomeUsuario, 
      emailUsuario, 
      senhaUsuario, 
      permissao,
    } = req.body;
    await usuarioService.Create(
      nome,
      nomeUsuario,
      emailUsuario,
      senhaUsuario,
      permissao
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) { 
      const id = req.params.id;
      await usuarioService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é invalida" });
    } 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(req.params.id)) {
      const { nome, nomeUsuario, emailUsuario, senhaUsuario, permissao} = req.body;
      const usuario = await usuarioService.Update(
        id,
        nome,
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        permissao,
      );
      res.status(200).json({ usuario });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};


const loginUsuario = async (req, res) => {
  try {
    const { emailUsuario, senhaUsuario } = req.body;
    if (emailUsuario != undefined){
      const usuario = await usuarioService.getByEmail(emailUsuario);
      if (usuario != undefined) {
        if (usuario.senhaUsuario == senhaUsuario) {
          jwt.sign(
            { id: usuario._id, email: usuario.emailUsuario },
            jwtSecret,
            { expiresIn: "48h" },
            (error, token) => {
              if (error) {
                res.status(400).json({ error: "Falha interna" });
              } else {
                res.status(200).json({ token: token });
              }
            }
          );
        } else {
          res.status(401).json({ error: "Credenciais Inválidas!" });
        }
      } else {
        res.status(404).json({ error: "O email enviado não existe na base de dados!" });
      }
    } else {  
      res.status(400).json({ error: "O email enviado é inválido!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

 const getOneUsuario = async (req, res) => {
    try {
      if (ObjectId.isValid(req.params.id)) {
        const id = req.params.id;
        const usuario = await usuarioService.getOne(id);
        if (!usuario) {
          res.status(404).json({ error: "Usuário não encontrado." });
        } else {
          res.status(200).json({ usuario });
        } 
      } else {
        res.status(400).json({ error: "A ID enviada é invalida" });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  };

export default {getAllUsuarios, createUsuario, deleteUsuario, updateUsuario, getOneUsuario, loginUsuario};
