const form = document.getElementById('avaliacao-form');
const estrelas = document.querySelectorAll('.estrela');
const inputEstrelas = document.getElementById('estrelas');

// Inicializar com 5 estrelas selecionadas
estrelas.forEach(estrela => estrela.classList.add('selecionada'));

// Sistema de avaliação por estrelas
estrelas.forEach((estrela, index) => {
    // Hover
    estrela.addEventListener('mouseenter', () => {
        limparEstrelas();
        for (let i = 0; i <= index; i++) {
            estrelas[i].classList.add('ativa');
            estrelas[i].textContent = '★';
        }
    });
    
    // Sair do hover
    estrela.addEventListener('mouseleave', () => {
        limparEstrelas();
        const valor = parseInt(inputEstrelas.value);
        for (let i = 0; i < valor; i++) {
            estrelas[i].classList.add('selecionada');
            estrelas[i].textContent = '★';
        }
    });
    
    // Click para selecionar
    estrela.addEventListener('click', () => {
        const valor = parseInt(estrela.getAttribute('data-valor'));
        inputEstrelas.value = valor;
        
        limparEstrelas();
        for (let i = 0; i < valor; i++) {
            estrelas[i].classList.add('selecionada');
            estrelas[i].textContent = '★';
        }
    });
});

function limparEstrelas() {
    estrelas.forEach(estrela => {
        estrela.classList.remove('ativa', 'selecionada');
        estrela.textContent = '☆';
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const experiencia = document.getElementById('experiencia').value;
    const estrelasSelecionadas = parseInt(document.getElementById('estrelas').value);
    
    try {
        // Salvar no banco de dados
        await fetch('/api/avaliacoes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone,
                avaliacao: experiencia,
                estrelas: estrelasSelecionadas
            })
        });
        
        // Feedback ao usuário
        alert('✅ Obrigado pela sua avaliação!\n\nSua opinião é muito importante para nós.');
        
        // Redirecionar para home
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao registrar avaliação. Tente novamente.');
    }
});
