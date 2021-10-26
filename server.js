import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import rutasProducto from './views/productos/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import rutasFuncionario from './views/funcionarios/rutas.js'

dotenv.config({ path: './.env' });

const app = Express();

const PORT = process.env.PORT || 5000;

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.A0_API_JWKSURI,
  }),
  audience: process.env.A0_API_AUDIENCE,
  issuer: process.env.AO_APP_ISSUER,
  algorithms:[process.env.A0_API_ALGORITHMS] ,
});

// app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});

app.use(rutasProducto);
app.use(rutasUsuario);
app.use(rutasVenta);
app.use(rutasFuncionario);

const main = () => {
  return app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${process.env.PORT}`);
  });
};

conectarBD(main);