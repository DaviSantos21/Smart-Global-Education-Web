const express = require('express');

const router = express.Router();

const matriculaController = require('../controllers/matriculaController');

router.get('/matriculas', matriculaController.listar);

router.post('/matriculas', matriculaController.criar);

module.exports = router; 