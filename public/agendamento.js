const form = document.getElementById('agendamento-form');

// Função para verificar disponibilidade de agenda do doutor
async function verificarDisponibilidadeDoutor(data, horario) {
    try {
        const horarios = JSON.parse(localStorage.getItem('horariosAgenda')) || [];
        
        // Verificar se existe horário de atendimento para a data
        const horariosData = horarios.filter(h => h.data === data);
        
        if (horariosData.length === 0) {
            return { disponivel: false, motivo: 'Doutor não tem horário de atendimento cadastrado para esta data.' };
        }
        
        // Verificar se o horário está dentro de um período de atendimento
        const dentroHorarioAtendimento = horariosData.some(h => {
            if (h.tipo !== 'atendimento') return false;
            return horario >= h.horaInicio && horario <= h.horaFim;
        });
        
        if (!dentroHorarioAtendimento) {
            return { disponivel: false, motivo: 'Este horário está fora do horário de atendimento do doutor.' };
        }
        
        // Verificar se o horário está em período de ausência
        const ausencia = horariosData.find(h => {
            if (h.tipo !== 'ausencia') return false;
            return horario >= h.horaInicio && horario <= h.horaFim;
        });
        
        if (ausencia) {
            return { 
                disponivel: false, 
                motivo: `Doutor estará ausente neste horário. Motivo: ${ausencia.motivoAusencia || 'Não informado'}` 
            };
        }
        
        return { disponivel: true };
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        return { disponivel: true }; // Em caso de erro, permitir agendamento
    }
}

// Criar novo agendamento
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const dataHora = document.getElementById('data_hora').value;
    
    // Pegar tipo de consulta selecionado (checkboxes)
    const tiposConsulta = [];
    document.querySelectorAll('input[name="tipo_consulta"]:checked').forEach(checkbox => {
        tiposConsulta.push(checkbox.value);
    });
    
    const tipo_consulta = tiposConsulta.join(', ');
    
    // Separar data e hora
    const [data_consulta, hora] = dataHora.split('T');
    const horario = hora;

    // Verificar disponibilidade do doutor
    const disponibilidade = await verificarDisponibilidadeDoutor(data_consulta, horario);
    
    if (!disponibilidade.disponivel) {
        alert(`❌ ${disponibilidade.motivo}\n\nPor favor, escolha outro horário.`);
        return;
    }

    try {
        // Primeiro, verificar se o paciente já existe ou criar novo
        let paciente_id;
        
        // Buscar pacientes existentes
        const responsePacientes = await fetch('/api/pacientes');
        const pacientes = await responsePacientes.json();
        
        // Verificar se paciente já existe pelo email
        const pacienteExistente = pacientes.find(p => p.email === email);
        
        if (pacienteExistente) {
            paciente_id = pacienteExistente.id;
        } else {
            // Criar novo paciente
            const responseCriar = await fetch('/api/pacientes', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ 
                    nome, 
                    email, 
                    telefone,
                    nascimento_mes: new Date().getMonth() + 1,
                    nascimento_ano: new Date().getFullYear()
                })
            });
            const novoPaciente = await responseCriar.json();
            paciente_id = novoPaciente.id;
        }

        // Criar agendamento
        await fetch('/api/agendamentos', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                paciente_id,
                data_consulta,
                tratamento: 'Consulta',
                periodo: new Date(dataHora).getHours() < 12 ? 'Manhã' : 'Tarde',
                horario,
                tipo_consulta,
                queixa: 'Agendamento via formulário web'
            })
        });

        form.reset();
        alert('✅ Agendamento criado com sucesso!');
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar agendamento!');
    }
});
