const express = require('express');

const router = express.Router();

const mensagemController = require('../controllers/mensagemController');

router.get('/mensagens', mensagemController.listar);

router.post('/mensagens', mensagemController.criar);

module.exports = router;