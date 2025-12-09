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

const container = document.getElementById('calendario-container');
const modal = document.getElementById('modal-horario');
const form = document.getElementById('form-horario');
const btnAdicionar = document.getElementById('btn-adicionar');
const tipoPeriodo = document.getElementById('tipo_periodo');
const grupoMotivo = document.getElementById('grupo-motivo');

// Array para armazenar os horários (simulando banco de dados)
let horarios = JSON.parse(localStorage.getItem('horariosAgenda')) || [];

// Mostrar/esconder campo de motivo baseado no tipo
tipoPeriodo.addEventListener('change', () => {
    if (tipoPeriodo.value === 'ausencia') {
        grupoMotivo.style.display = 'block';
        document.getElementById('motivo_ausencia').required = true;
    } else {
        grupoMotivo.style.display = 'none';
        document.getElementById('motivo_ausencia').required = false;
        document.getElementById('motivo_ausencia').value = '';
    }
});

// Abrir modal para adicionar horário
btnAdicionar.addEventListener('click', () => {
    form.reset();
    document.getElementById('horario_id').value = '';
    grupoMotivo.style.display = 'none';
    modal.style.display = 'block';
});

// Fechar modal
function fecharModal() {
    modal.style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    if (event.target == modal) {
        fecharModal();
    }
}

// Verificar conflito com agendamentos
async function verificarConflitoAgendamentos(data, horaInicio, horaFim) {
    try {
        const response = await fetch('/api/agendamentos');
        const agendamentos = await response.json();
        
        const conflitos = agendamentos.filter(ag => {
            if (!ag.data_consulta || !ag.horario) return false;
            
            const dataAg = ag.data_consulta.split('T')[0];
            if (dataAg !== data) return false;
            
            const horarioAg = ag.horario;
            
            // Verificar se o horário do agendamento está dentro do período
            return horarioAg >= horaInicio && horarioAg <= horaFim;
        });
        
        return conflitos;
    } catch (error) {
        console.error('Erro ao verificar conflitos:', error);
        return [];
    }
}

// Salvar horário
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const horarioId = document.getElementById('horario_id').value;
    const data = document.getElementById('data').value;
    const horaInicio = document.getElementById('hora_inicio').value;
    const horaFim = document.getElementById('hora_fim').value;
    const tipo = document.getElementById('tipo_periodo').value;
    const motivoAusencia = document.getElementById('motivo_ausencia').value;
    
    // Validar hora início menor que hora fim
    if (horaInicio >= horaFim) {
        alert('Hora de início deve ser menor que hora de fim!');
        return;
    }
    
    // Verificar conflitos com agendamentos se for ausência
    if (tipo === 'ausencia') {
        const conflitos = await verificarConflitoAgendamentos(data, horaInicio, horaFim);
        
        if (conflitos.length > 0) {
            const mensagem = `ATENÇÃO! Existem ${conflitos.length} agendamento(s) neste período:\n\n` +
                conflitos.map(ag => `- ${ag.horario} - Paciente ID: ${ag.paciente_id}`).join('\n') +
                '\n\nDeseja marcar ausência mesmo assim? Os pacientes precisarão ser reagendados.';
            
            if (!confirm(mensagem)) {
                return;
            }
        }
    }
    
    const horarioData = {
        id: horarioId || Date.now(),
        data: data,
        horaInicio: horaInicio,
        horaFim: horaFim,
        tipo: tipo,
        motivoAusencia: motivoAusencia,
        status: tipo === 'atendimento' ? 'disponivel' : 'ausente',
        criadoEm: new Date().toISOString()
    };
    
    if (horarioId) {
        // Editar
        const index = horarios.findIndex(h => h.id == horarioId);
        if (index !== -1) {
            horarios[index] = { ...horarios[index], ...horarioData };
        }
    } else {
        // Adicionar novo
        horarios.push(horarioData);
    }
    
    // Salvar no localStorage
    localStorage.setItem('horariosAgenda', JSON.stringify(horarios));
    
    fecharModal();
    carregarHorarios();
    alert('Horário salvo com sucesso!');
});

// Carregar e exibir horários
async function carregarHorarios() {
    horarios = JSON.parse(localStorage.getItem('horariosAgenda')) || [];
    
    // Buscar agendamentos para verificar conflitos
    let agendamentos = [];
    try {
        const response = await fetch('/api/agendamentos');
        agendamentos = await response.json();
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
    }
    
    if (horarios.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <div class="empty-state-text">Nenhum horário cadastrado</div>
            </div>
        `;
        return;
    }
    
    // Ordenar por data e hora
    horarios.sort((a, b) => {
        const dataA = new Date(`${a.data}T${a.horaInicio}`);
        const dataB = new Date(`${b.data}T${b.horaInicio}`);
        return dataA - dataB;
    });
    
    let html = '';
    
    horarios.forEach(horario => {
        const dataFormatada = new Date(horario.data + 'T00:00:00').toLocaleDateString('pt-BR');
        const statusClass = `status-${horario.status}`;
        const statusTexto = horario.status === 'disponivel' ? 'DISPONÍVEL' : 
                           horario.status === 'confirmado' ? 'CONFIRMADO' : 'AUSENTE';
        
        // Verificar conflitos com agendamentos
        const conflitos = agendamentos.filter(ag => {
            if (!ag.data_consulta || !ag.horario) return false;
            const dataAg = ag.data_consulta.split('T')[0];
            return dataAg === horario.data && ag.horario >= horario.horaInicio && ag.horario <= horario.horaFim;
        });
        
        const alertaConflito = conflitos.length > 0 ? 
            `<div class="alerta-conflito">⚠️ ${conflitos.length} agendamento(s) neste período</div>` : '';
        
        html += `
            <div class="calendario-card ${horario.tipo === 'ausencia' ? 'card-ausencia' : ''}" id="horario-${horario.id}">
                <div class="card-label">Calendário:</div>
                
                <div class="card-info-row">
                    <div class="card-info-item">
                        <span class="info-label">Data:</span>
                        <span class="info-value">${dataFormatada}</span>
                    </div>
                    <div class="card-info-item">
                        <span class="info-label">Hora:</span>
                        <span class="info-value">${horario.horaInicio} - ${horario.horaFim}</span>
                    </div>
                </div>
                
                ${horario.motivoAusencia ? `
                <div class="card-motivo">
                    <div class="info-label">Motivo da Ausência:</div>
                    <div class="motivo-text">${horario.motivoAusencia}</div>
                </div>
                ` : ''}
                
                ${alertaConflito}
                
                <span class="status-badge ${statusClass}">${statusTexto}</span>
                <span class="tipo-badge">${horario.tipo === 'atendimento' ? 'ATENDIMENTO' : 'AUSÊNCIA'}</span>
                
                <div class="card-buttons">
                    <button class="btn-confirma" onclick="confirmarHorario(${horario.id})" 
                        ${horario.status === 'confirmado' || horario.tipo === 'ausencia' ? 'disabled' : ''}>
                        Confirma
                    </button>
                    <button class="btn-atender" onclick="marcarAtender(${horario.id})"
                        ${horario.tipo === 'ausencia' ? 'disabled' : ''}>
                        Atender
                    </button>
                    <button class="btn-ausente" onclick="excluirHorario(${horario.id})">
                        Excluir
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Confirmar horário
function confirmarHorario(id) {
    if (!confirm('Confirmar este horário?')) return;
    
    const index = horarios.findIndex(h => h.id == id);
    if (index !== -1) {
        horarios[index].status = 'confirmado';
        localStorage.setItem('horariosAgenda', JSON.stringify(horarios));
        carregarHorarios();
        alert('Horário confirmado!');
    }
}

// Marcar como atender
function marcarAtender(id) {
    const index = horarios.findIndex(h => h.id == id);
    if (index !== -1) {
        horarios[index].status = 'disponivel';
        localStorage.setItem('horariosAgenda', JSON.stringify(horarios));
        carregarHorarios();
        alert('Status alterado para: Disponível para Atender');
    }
}

// Excluir horário
function excluirHorario(id) {
    if (!confirm('Tem certeza que deseja excluir este horário?')) return;
    
    horarios = horarios.filter(h => h.id != id);
    localStorage.setItem('horariosAgenda', JSON.stringify(horarios));
    carregarHorarios();
    alert('Horário excluído!');
}

// Carregar horários ao iniciar
window.addEventListener('DOMContentLoaded', carregarHorarios);
