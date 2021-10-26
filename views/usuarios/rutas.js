import Express from 'express';
import {
  queryAllUsers,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  consultarUsuario,
  consultarUsuarioByEmail,
  consultarVendedoresActivos,
  consultarVendedoresBloqueados,
  consultarOCrearUsuarioFromAuth2,
} from '../../controllers/usuarios/controller.js';

const rutasUsuario = Express.Router();

const generaCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando información');
  } else {
    res.json(result);
  }
};

rutasUsuario.route('/usuarios').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios');
  queryAllUsers(generaCallback(res));
});

rutasUsuario.route('/usuarios').post((req, res) => {
  crearUsuario(req.body, generaCallback(res));
});

rutasUsuario.route('/usuarios/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios/id');
  consultarUsuario(req.params.id, generaCallback(res));
});

rutasUsuario.route('/usuarios/email/:email').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios/email');
  consultarUsuarioByEmail(req.params.email, generaCallback(res));
});

rutasUsuario.route('/usuarios/verificacion').post((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios/insertaroconsultarauth');
  consultarOCrearUsuarioFromAuth2(req.body, generaCallback(res));
});

// rutasUsuario.route('/usuarios/verificacion/self/').get((req, res) => {
//   console.log('alguien hizo get en la ruta /self');
//   consultarOCrearUsuarioFromAuth(req, generaCallback(res));
// });

rutasUsuario.route('/usuarios/:id').patch((req, res) => {
  editarUsuario(req.params.id, req.body, generaCallback(res));
});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
  eliminarUsuario(req.params.id, generaCallback(res));
});

rutasUsuario.route('/usuarios/vendedores/activos').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios/vendedores/activos');
  consultarVendedoresActivos(generaCallback(res));
});

rutasUsuario.route('/usuarios/vendedores/activos').get((req, res) => {
  console.log('alguien hizo get en la ruta /usuarios/vendedores/bloqueados');
  consultarVendedoresBloqueados(generaCallback(res));
});

export default rutasUsuario;
