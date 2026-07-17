const express = require('express');

const router = express.Router();

const verificarAcesso = require('../middlewares/verificarAcesso');

const turmaController = require('../controllers/turmaController');

router.get('/turmas', verificarAcesso('admin', 'secretary', 'professor'), turmaController.listar);

router.get('/turmas/:id', verificarAcesso('admin', 'secretary', 'professor'), turmaController.buscarPorId);

router.post('/turmas', verificarAcesso('admin', 'secretary'), turmaController.criar); 

router.put('/turmas/:id', verificarAcesso('admin', 'secretary'), turmaController.atualizar);

router.delete('/turmas/:id', verificarAcesso('admin', 'secretary'), turmaController.deletar);

module.exports = router;