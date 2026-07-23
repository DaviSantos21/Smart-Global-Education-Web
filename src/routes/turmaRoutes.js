const express = require('express');

const router = express.Router();

const verificarAcesso = require('../middlewares/verificarAcesso');

const turmaController = require('../controllers/turmaController');

router.get('/turmas', verificarAcesso('admin', 'secretaria', 'professor'), turmaController.listar);

router.get('/turmas/:id', verificarAcesso('admin', 'secretaria', 'professor'), turmaController.buscarPorId);

router.post('/turmas', verificarAcesso('admin', 'secretaria'), turmaController.criar); 

router.put('/turmas/:id', verificarAcesso('admin', 'secretaria'), turmaController.atualizar);

router.delete('/turmas/:id', verificarAcesso('admin', 'secretaria'), turmaController.deletar);

module.exports = router;