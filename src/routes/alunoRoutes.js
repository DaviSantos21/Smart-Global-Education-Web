const express = require('express');

const router = express.Router();

const alunoController = require('../controllers/alunoController');

router.get('/alunos', alunoController.listar);

router.get('/alunos/:id', alunoController.buscarPorId);

router.post('/alunos', alunoController.criar);

router.put('/alunos/:id', alunoController.atualizar);

router.delete('/alunos/:id', alunoController.deletar);

module.exports = router;