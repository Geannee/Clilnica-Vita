const avaliacaoService = require('../services/avaliacaoService');

module.exports = {
    getAllAvaliacoes: async (req, res) => {
        const lista = await avaliacaoService.listar();
        res.json(lista);
    },

    createAvaliacao: async (req, res) => {
        const { nome, email, telefone, avaliacao, estrelas } = req.body;

        await avaliacaoService.criar(nome, email, telefone, avaliacao, estrelas || 5);

        res.json({ mensagem: 'Avaliação registrada com sucesso!' });
    }
};
