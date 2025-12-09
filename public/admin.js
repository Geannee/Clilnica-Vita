// Função para verificar se o login expirou (2 horas)
function verificarExpiracao() {
    const loginTime = localStorage.getItem('loginTime');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        alert('Você precisa fazer login para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }
    
    if (!loginTime) {
        alert('Sessão inválida. Por favor, faça login novamente.');
        window.location.href = 'login.html';
        return;
    }
    
    const tempoLogin = new Date(loginTime);
    const agora = new Date();
    const diferencaHoras = (agora - tempoLogin) / (1000 * 60 * 60);
    
    if (diferencaHoras >= 2) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('loginTime');
        alert('Sua sessão expirou após 2 horas. Por favor, faça login novamente.');
        window.location.href = 'login.html';
    }
}

// Verificar expiração ao carregar a página
verificarExpiracao();

const container = document.getElementById('agendamentos_container');

// Buscar todos os agendamentos
async function carregarAgendamentos() {
    try {
        container.innerHTML = '<div class="loading">Carregando agendamentos...</div>';
        
        // Buscar agendamentos e pacientes
        const [responseAgendamentos, responsePacientes] = await Promise.all([
            fetch('/api/agendamentos'),
            fetch('/api/pacientes')
        ]);
        
        const agendamentos = await responseAgendamentos.json();
        const pacientes = await responsePacientes.json();

        if (!agendamentos || agendamentos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📅</div>
                    <div class="empty-state-text">Nenhum agendamento encontrado</div>
                </div>
            `;
            return;
        }

        // Criar mapa de pacientes por ID
        const pacientesMap = {};
        pacientes.forEach(p => {
            pacientesMap[p.id] = p;
        });

        // Criar cards
        let html = '';
        
        agendamentos.forEach(ag => {
            const paciente = pacientesMap[ag.paciente_id] || {};
            const data = ag.data_consulta ? new Date(ag.data_consulta).toLocaleDateString('pt-BR') : 'N/A';
            const status = ag.status || 'pendente';
            const statusClass = `status-${status.toLowerCase()}`;
            
            html += `
                <div class="agendamento-card" id="card-${ag.id}">
                    <div class="card-header">
                        <div class="card-nome">${paciente.nome || 'N/A'}</div>
                        <span class="status-badge ${statusClass}">${status.toUpperCase()}</span>
                    </div>
                    
                    <div class="card-info-grid">
                        <div class="card-info-item">
                            <span class="card-info-label">Data:</span>
                            <span class="card-info-value">${data}</span>
                        </div>
                        <div class="card-info-item">
                            <span class="card-info-label">Hora:</span>
                            <span class="card-info-value">${ag.horario || 'N/A'}</span>
                        </div>
                        <div class="card-info-item">
                            <span class="card-info-label">Telefone:</span>
                            <span class="card-info-value">${paciente.telefone || 'N/A'}</span>
                        </div>
                        <div class="card-info-item">
                            <span class="card-info-label">Procedimento:</span>
                            <span class="card-info-value">${ag.tratamento || 'N/A'}</span>
                        </div>
                    </div>
                    
                    <div class="card-buttons">
                        <button class="btn-confirma" onclick="confirmarConsulta(${ag.id})" ${status === 'confirmado' ? 'disabled style="opacity:0.5"' : ''}>Confirma</button>
                        <button class="btn-alterar" onclick="alterarAgendamento(${ag.id}, ${ag.paciente_id})">Alterar</button>
                        <button class="btn-excluir" onclick="excluirAgendamento(${ag.id})">Excluir</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<div class="loading" style="color: #FF6B6B;">Erro ao carregar agendamentos!</div>';
        console.error(error);
    }
}

// Função para confirmar consulta
async function confirmarConsulta(id) {
    if (!confirm('Confirmar esta consulta?')) {
        return;
    }

    try {
        const response = await fetch(`/api/agendamentos/${id}/status`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ status: 'confirmado' })
        });

        if (response.ok) {
            alert('Consulta confirmada com sucesso!');
            carregarAgendamentos();
        } else {
            alert('Erro ao confirmar consulta');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao confirmar consulta!');
    }
}

// Função para alterar agendamento - redireciona para tela de cadastro
function alterarAgendamento(agendamentoId, pacienteId) {
    // Salvar IDs no localStorage para edição
    localStorage.setItem('editAgendamentoId', agendamentoId);
    localStorage.setItem('editPacienteId', pacienteId);
    
    // Redirecionar para página de cadastro/edição
    window.location.href = `index.html?edit=${pacienteId}`;
}

// Função para excluir agendamento
async function excluirAgendamento(id) {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) {
        return;
    }

    try {
        const response = await fetch(`/api/agendamentos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Agendamento excluído com sucesso!');
            carregarAgendamentos();
        } else {
            alert('Erro ao excluir agendamento');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir agendamento!');
    }
}

// Carregar agendamentos ao carregar a página
window.addEventListener('DOMContentLoaded', carregarAgendamentos);
