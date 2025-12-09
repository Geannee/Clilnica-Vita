

const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/', agendamentosController.getAllAgendamentos);
router.post('/', agendamentosController.createAgendamento);
router.put('/:id', agendamentosController.updateAgendamento);
router.patch('/:id/status', agendamentosController.updateStatus);
router.delete('/:id', agendamentosController.deleteAgendamento);

module.exports = router



