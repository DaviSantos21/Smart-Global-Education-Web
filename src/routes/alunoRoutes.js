const express = require('express');

const router = express.Router();

const verificarAcesso = require('../middlewares/verificarAcesso');

const alunoController = require('../controllers/alunoController');

router.get('/alunos', verificarAcesso('admin', 'secretary', 'professor'), alunoController.listar);

router.get('/alunos/:id', verificarAcesso('admin', 'secretary', 'professor'), alunoController.buscarPorId);

router.post('/alunos', verificarAcesso('admin', 'secretary'), alunoController.criar);

router.put('/alunos/:id', verificarAcesso('admin', 'secretary'), alunoController.atualizar);

router.delete('/alunos/:id', verificarAcesso('admin', 'secretary'), alunoController.deletar);

module.exports = router;