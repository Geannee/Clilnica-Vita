//O controller é o “recepcionista inteligente” do seu sistema.
// Ele recebe as solicitações dos usuários, processa essas solicitações
// e interage com os serviços para obter ou modificar dados conforme necessário.
// Depois, ele envia a resposta de volta ao usuário, garantindo que tudo funcione
// de maneira fluida e eficiente.   
  

const pacienteService = require('../services/pacienteService');  // nome correto do arquivo

module.exports = {
    getAllPacientes: async (req, res) => {
        const lista = await pacienteService.listar();   // função correta
        res.json(lista);
    },

    createPaciente: async (req, res) => {
        const { nome, email, telefone, nascimento_mes, nascimento_ano } = req.body;

        await pacienteService.criar(nome, email, telefone, nascimento_mes, nascimento_ano);

        res.json({ mensagem: 'Paciente cadastrado com sucesso!' });
    },

    updatePaciente: async (req, res) => {
        const { id } = req.params;
        const { nome, telefone } = req.body;

        await pacienteService.atualizar(id, nome, telefone);

        res.json({ mensagem: 'Paciente atualizado com sucesso!' });
    }
};


