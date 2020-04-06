'use strict';

require('dotenv').config();
// const { buildSchema } = require('graphql'); // buildSchema utilidad que me permite crear schemas.
const { makeExecutableSchema } = require('graphql-tools'); //se utiliza en vez de buildSchema, ya que hace lo mismo pero de una manera mas especializada.
const express = require('express');
const cors = require('cors');
const gqlMiddleware = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
// const db = require('./lib/db');

const resolvers = require('./lib/resolvers');

// creo mi servidor.
const app = express();
const port = process.env.port || 3500;
const isDev = process.env.NODE_ENV !== 'production';
// db();
// Definir el esquema inicial
// type Query -> indico que inicio crear acciones de consulta de informacion.
// hello: String -> nombre de la accion : retorno del query
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
// Configuracion de los resolvers, este objeto contiene una propierdad del mismo nombre de la query que va a resolver o ejecutar.
//Estos resolvers se separan en un archivo para organizar.
// const resolvers = {
//   hello: () => {
//     return 'Hola mundo';
//   },
// };

app.use(
  '/api',
  gqlMiddleware({
    schema: schema, // Schema definido.
    rootValue: resolvers, // Resolvers creados.
    graphiql: isDev, // Entonrno de desarrollo de graphql.
  })
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Ejecutar el query: le indico el schema y nombre del query -> hello, esto para llamarlo desde la terminal.
// graphql(schema, '{saludo}', resolvers).then(data => {
//   console.log(data);
// });
