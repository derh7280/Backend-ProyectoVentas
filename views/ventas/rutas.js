import Express from 'express';
import {
  queryAllSales,
  crearVenta,
  editarVenta,
  eliminarVenta,
  consultarVenta,
} from '../../controllers/ventas/controller.js';

const rutasVenta = Express.Router();

const generaCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los ventas');
  } else {
    res.json(result);
  }
};

rutasVenta.route('/ventas').get((req, res) => {
  console.log('alguien hizo get en la ruta /ventas');
  queryAllSales(generaCallback(res));
});

rutasVenta.route('/ventas').post((req, res) => {
  crearVenta(req.body, generaCallback(res));
});

rutasVenta.route('/ventas/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /ventas');
  consultarVenta(req.params.id, generaCallback(res));
});

rutasVenta.route('/ventas/:id').patch((req, res) => {
  editarVenta(req.params.id, req.body, generaCallback(res));
});

rutasVenta.route('/ventas/:id').delete((req, res) => {
  eliminarVenta(req.params.id, generaCallback(res));
});

export default rutasVenta;
