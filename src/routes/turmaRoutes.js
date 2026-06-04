const express = require('express');

const router = express.Router();

const turmaController = require('../controllers/turmaController');

router.get('/turmas', turmaController.listar);

router.get('/turmas/:id', turmaController.buscarPorId);

router.post('/turmas', turmaController.criar); 

router.put('/turmas/:id', turmaController.atualizar);

router.delete('/turmas/:id', turmaController.deletar);

module.exports = router;