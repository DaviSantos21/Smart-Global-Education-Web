const express = require ('express');

const cors = require('cors');

const app = express();

app.use(express.json());

require('./config/db');

app.use(cors());

const alunoRoutes = require('./routes/alunoRoutes');

app.use(alunoRoutes);

app.get('/', (req, res) => {

res.send('Servidor funcionando!');

});

const PORT = 3000;

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);});