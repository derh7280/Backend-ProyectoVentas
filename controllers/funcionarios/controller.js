import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllFuntionary = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('vendedores').find({}).limit(50).toArray(callback);
};

const crearFuncionario = async (datosFuncionario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vendedores').insertOne(datosFuncionario, callback);
};

const consultarFuncionario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vendedores').findOne({ _id: new ObjectId(id) }, callback);
};

const editarFuncionario = async (id, edicion, callback) => {
  const filtroFuncionario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('vendedores')
    .findOneAndUpdate(filtroFuncionario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarFuncionario = async (id, callback) => {
  const filtroFuncionario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('vendedores').deleteOne(filtroFuncionario, callback);
};

export { queryAllFuntionary, crearFuncionario, consultarFuncionario, editarFuncionario, eliminarFuncionario };
