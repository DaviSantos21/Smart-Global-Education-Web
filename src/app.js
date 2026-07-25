const express = require ('express');

const cors = require('cors');

require('./config/db');

const authRoutes = require('./routes/authRoutes');
 
const autenticar = require('./middlewares/autenticar');

const userRoutes = require('./routes/userRoutes');  

const alunoRoutes = require('./routes/alunoRoutes');

const turmaRoutes = require('./routes/turmaRoutes');

const matriculaRoutes = require('./routes/matriculaRoutes');

const mensagemRoutes = require('./routes/mensagemRoutes');

const app = express();

app.use(cors({
    origin: ['http://127.0.0.1:5500/front-end/index.html',
        'https://smart-global-education-web.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use(authRoutes);

app.use(autenticar);

app.use(userRoutes);

app.use(alunoRoutes);

app.use(turmaRoutes);

app.use(matriculaRoutes);

app.use(mensagemRoutes);

app.get('/', (req, res) => {

res.send('Servidor funcionando!');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);});