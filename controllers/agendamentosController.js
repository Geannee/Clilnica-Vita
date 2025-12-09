const agendamentoService = require('../services/agendamentoService');

module.exports = {
    getAllAgendamentos: async (req, res) => {
        const lista = await agendamentoService.listar();
        res.json(lista);
    },

    createAgendamento: async (req, res) => {
        const { paciente_id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa } = req.body;

        await agendamentoService.criar(paciente_id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa);

        res.json({ mensagem: 'Agendamento criado com sucesso!' });
    },

    updateAgendamento: async (req, res) => {
        const { id } = req.params;
        const { data_consulta, tratamento, periodo, horario, tipo_consulta, queixa } = req.body;

        await agendamentoService.atualizar(id, data_consulta, tratamento, periodo, horario, tipo_consulta, queixa);

        res.json({ mensagem: 'Agendamento atualizado com sucesso!' });
    },

    updateStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        await agendamentoService.atualizarStatus(id, status);

        res.json({ mensagem: 'Status atualizado com sucesso!' });
    },

    deleteAgendamento: async (req, res) => {
        const { id } = req.params;

        await agendamentoService.excluir(id);

        res.json({ mensagem: 'Agendamento excluído com sucesso!' });
    }
};


