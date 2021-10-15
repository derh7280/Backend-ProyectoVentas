import Express from 'express';
import {
  queryAllFuntionary,
  crearFuncionario,
  editarFuncionario,
  eliminarFuncionario,
  consultarFuncionario,
} from '../../controllers/funcionarios/controller.js';

const rutasFncionario = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los funcionarios');
  } else {
    res.json(result);
  }
};

rutasFncionario.route('/funcionarios').get((req, res) => {
  console.log('alguien hizo get en la ruta /funcionarios');
  queryAllFuntionary(genercCallback(res));
});

rutasFncionario.route('/funcionarios').post((req, res) => {
  crearFuncionario(req.body, genercCallback(res));
});

rutasFncionario.route('/funcionarios/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /funcionarios');
  consultarFuncionario(req.params.id, genercCallback(res));
});

rutasFncionario.route('/funcionarios/:id').patch((req, res) => {
  editarFuncionario(req.params.id, req.body, genercCallback(res));
});

rutasFncionario.route('/funcionarios/:id').delete((req, res) => {
  eliminarFuncionario(req.params.id, genercCallback(res));
});

export default rutasFncionario;
