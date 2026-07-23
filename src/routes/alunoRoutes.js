const express = require('express');

const router = express.Router();

const verificarAcesso = require('../middlewares/verificarAcesso');

const alunoController = require('../controllers/alunoController');

router.get('/alunos', verificarAcesso('admin', 'secretaria', 'professor'), alunoController.listar);

router.get('/alunos/:id', verificarAcesso('admin', 'secretaria', 'professor'), alunoController.buscarPorId);

router.post('/alunos', verificarAcesso('admin', 'secretaria'), alunoController.criar);

router.put('/alunos/:id', verificarAcesso('admin', 'secretaria'), alunoController.atualizar);

router.delete('/alunos/:id', verificarAcesso('admin', 'secretaria'), alunoController.deletar);

module.exports = router;