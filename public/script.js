const form = document.getElementById('user-form');

// cadastrar paciente
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const queixa = document.getElementById('queixa').value;

    try {
        await fetch('/api/pacientes', {
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

        form.reset();
        alert('Paciente cadastrado com sucesso!');
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar paciente!');
    }
});
