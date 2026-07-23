const express = require('express');

const router = express.Router();

const verificarAcesso = require('../middlewares/verificarAcesso');

const matriculaController = require('../controllers/matriculaController');

router.get('/matriculas', verificarAcesso('admin', 'secretaria', 'professor'), matriculaController.listar);

router.post('/matriculas', verificarAcesso('admin', 'secretaria'), matriculaController.criar);

module.exports = router; 