import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  // await baseDeDatos.collection('usuarios').find({}).limit(50).toArray(callback);
  await baseDeDatos.collection('usuarios').find({}).toArray(callback);
};

const crearUsuario = async (datos, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').insertOne(datos, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarUsuarioByEmail = async (email, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ email: email }, callback);
};

const consultarOCrearUsuarioFromAuth1 = async (req, callback) => {
  console.log('Estoy llegando a crear usuario Auth');
  // 6.1. obtener los datos del usuario desde el token
  //const token = res.headers.authorization;
  //const token = req.headers.authorization.split('Bearer ')[1];//opcion1
  //const token = req.headers.authorization.replace('Bearer ',''); //opcion 2
  //const userA0 = jwt_decode(token)////['http://localhost/userData'];
  //console.log(userA0);
  const userA0 = JSON.stringify(req);
  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ email: userA0.email }, async (err, response) => {
    console.log('response consulta bd usuario', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      userA0.auth0ID = userA0._id;
      delete userA0._id;
      userA0.rol = 'Sin rol';
      userA0.estado = 'Pendiente';
      
      await crearUsuario(userA0, (err, respuesta) => callback(err, userA0));
    }
  });
};

const consultarOCrearUsuarioFromAuth2 = async (datos, callback) => {
  console.log('Estoy llegando a crear usuario Auth');
  // 6.1. obtener los datos del usuario desde el token
  //const token = req.headers.authorization.split('Bearer ')[1];
  //const userA0 = jwt_decode(token)['http://localhost/userData'];
  //console.log(userA0);
  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  console.log("Datos a insertar " + JSON.stringify(datos));
  await baseDeDatos.collection('usuarios').findOne({ email: datos.email }, async (err, response) => {
    console.log('response consulta bd usuario', response);
    if (response) {
      console.log("usuario email encontrado");
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      console.log("usuario en el insert ");
      await crearUsuario(datos, (err, respuesta) => callback(err, datos));
    }
  });
};

const consultarOCrearUsuarioFromAuth3 = async (req, callback) => {
  console.log('Estoy llegando a crear usuario');
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  console.log(user);

  // 6.2. con el correo del usuario o con el id de auth0, verificar si el usuario ya esta en la bd o no
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
    console.log('response consulta bd', response);
    if (response) {
      // 7.1. si el usuario ya esta en la BD, devuelve la info del usuario
      callback(err, response);
    } else {
      // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
      user.auth0ID = user._id;
      delete user._id;
      user.rol = 'sin rol';
      user.estado = 'pendiente';
      await crearUsuario(user, (err, respuesta) => callback(err, user));
    }
  });
};

const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuarios')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, callback);
};

const consultarVendedoresActivos = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuarios').find({ rol: 'Vendedor', estado:'Autorizado'}).toArray(callback);
};

const consultarVendedoresBloqueados = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').find({ rol: 'Vendedor', estado:'No autorizado'}, callback);
  };

export { queryAllUsers, crearUsuario, consultarUsuario, consultarUsuarioByEmail, consultarOCrearUsuarioFromAuth2, editarUsuario, eliminarUsuario, consultarVendedoresActivos,consultarVendedoresBloqueados };
