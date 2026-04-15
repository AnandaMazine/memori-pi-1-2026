import express from 'express';
const usuarioRoutes = express.Router();
import usuarioController from '../controllers/usuarioController.js';  
import auth from '../middleware/auth.js';

// rota pública (login)
usuarioRoutes.post('/auth', usuarioController.loginUsuario);
usuarioRoutes.post('/', usuarioController.createUsuario);

// rotas protegidas
usuarioRoutes.get('/', auth.Authorization, usuarioController.getAllUsuarios);
usuarioRoutes.delete('/:id', auth.Authorization, usuarioController.deleteUsuario);
usuarioRoutes.put('/:id', auth.Authorization, usuarioController.updateUsuario);
usuarioRoutes.get('/:id', auth.Authorization, usuarioController.getOneUsuario);

export default usuarioRoutes;
