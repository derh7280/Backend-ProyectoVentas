import Express from 'express';
import {
  queryAllFuntionary,
  crearFuncionario,
  editarFuncionario,
  eliminarFuncionario,
  consultarFuncionario,
} from '../../controllers/funcionarios/controller.js';

const rutasFuncionario = Express.Router();

const generaCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los funcionarios');
  } else {
    res.json(result);
  }
};

rutasFuncionario.route('/funcionarios').get((req, res) => {
  console.log('alguien hizo get en la ruta /funcionarios');
  queryAllFuntionary(generaCallback(res));
});

rutasFuncionario.route('/funcionarios').post((req, res) => {
  crearFuncionario(req.body, generaCallback(res));
});

rutasFuncionario.route('/funcionarios/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /funcionarios');
  consultarFuncionario(req.params.id, generaCallback(res));
});

rutasFuncionario.route('/funcionarios/:id').patch((req, res) => {
  editarFuncionario(req.params.id, req.body, generaCallback(res));
});

rutasFuncionario.route('/funcionarios/:id').delete((req, res) => {
  eliminarFuncionario(req.params.id, generaCallback(res));
});

export default rutasFuncionario;
