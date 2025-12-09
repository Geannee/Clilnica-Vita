const form = document.getElementById('login-form');

// Credenciais de demonstração
const ADMIN_USUARIO = 'admin';
const ADMIN_SENHA = 'Admin123';

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;

    // Validar credenciais
    if (usuario === ADMIN_USUARIO && senha === ADMIN_SENHA) {
        // Salvar sessão no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', usuario);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        alert('Login realizado com sucesso!');
        
        // Redirecionar para página de administrador
        window.location.href = 'admin.html';
    } else {
        alert('Usuário ou senha incorretos!\n\nTente:\nUsuário: admin\nSenha: Admin123');
        document.getElementById('senha').value = '';
        document.getElementById('senha').focus();
    }
});

// Função para verificar se o login expirou (2 horas)
function verificarExpiracao() {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return false;
    
    const tempoLogin = new Date(loginTime);
    const agora = new Date();
    const diferencaHoras = (agora - tempoLogin) / (1000 * 60 * 60); // diferença em horas
    
    if (diferencaHoras >= 2) {
        // Sessão expirada
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('loginTime');
        return true; // expirado
    }
    
    return false; // ainda válido
}

// Verificar se já está logado ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        if (verificarExpiracao()) {
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            return;
        }
        
        // Se já estiver logado e não expirou, pode redirecionar
        const continuar = confirm('Você já está logado. Deseja continuar para a área administrativa?');
        if (continuar) {
            window.location.href = 'admin.html';
        }
    }
});
