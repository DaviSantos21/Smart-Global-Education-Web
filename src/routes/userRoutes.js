const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verificarAcesso = require('../middlewares/verificarAcesso');

router.get('/users', verificarAcesso('admin'), userController.listar);
router.post('/users', verificarAcesso('admin'), userController.criar);
router.put('/users/:id', verificarAcesso('admin'), userController.atualizar);
router.delete('/users/:id', verificarAcesso('admin'), userController.deletar);

module.exports = router;