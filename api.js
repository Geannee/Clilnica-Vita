const express = require('express');
const router = express.Router();
const pacienteRoutes = require("./routes/pacientesRoutes");
const agendamentoRoutes = require("./routes/agendamentosRoutes");
const avaliacaoRoutes = require("./routes/avaliacoesRoutes");

router.use('/agendamentos', agendamentoRoutes);
router.use('/pacientes', pacienteRoutes);
router.use('/avaliacoes', avaliacaoRoutes);

module.exports = router;    

