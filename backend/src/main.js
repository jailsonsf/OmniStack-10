require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.use(cors());

app.use(express.json());

app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE
//
// Tipos de parâmetros
// 
// Query Params: request.quety (Filtros, ordenação, paginação...)
// Route Params: request.params (Identificar um recurso  na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

app.listen(3333);
