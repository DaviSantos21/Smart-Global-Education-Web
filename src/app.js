const express = require ('express');

const cors = require('cors');

require('./config/db.js');

const alunoRoutes = require('./routes/alunoRoutes');

const turmaRoutes = require('./routes/turmaRoutes');

const matriculaRoutes = require('./routes/matriculaRoutes');

const mensagemRoutes = require('./routes/mensagemRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(alunoRoutes);

app.use(turmaRoutes);

app.use(matriculaRoutes);

app.use(mensagemRoutes);

app.get('/', (req, res) => {

res.send('Servidor funcionando!');

});

const PORT = 3000;

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);});