
function iniciarSistema() {
    document.getElementById('tela-login').classList.add('hidden');
    document.getElementById('tela-sistema').classList.remove('hidden');
    mostrar('dashboard');

    carregarDashboard();
    carregarAlunos();
    carregarTurmas();
    carregarSelects();
    carregarMatriculas();
    carregarMensagens();
}

async function tentarLogin() {

    const email = document.getElementById('login-usuario').value.trim();
    const senha = document.getElementById('login-senha').value;
    const erro = document.getElementById('login-erro');

    try{

        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body:JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if(!resposta.ok) {
            erro.textContent = dados.erro || 'Credenciais inválidas';
            erro.classList.remove('hidden');
            document.getElementById('login-senha').value = '';
            return;
        }

        sessionStorage.setItem('token', dados.token);
        sessionStorage.setItem('user', JSON.stringify(dados.user)); 
        erro.classList.add('hidden');
        iniciarSistema();




        

    }catch (e) {

        erro.textContent = 'Erro ao conectar com o servidor.'
        erro.classList.remove('hidden');
        
    }

}

function logout() {

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    document.getElementById('tela-sistema').classList.add('hidden');
    document.getElementById('tela-login').classList.remove('hidden');

    document.getElementById('login-usuario').value = '';
    document.getElementById('login-senha').value   = '';
    document.getElementById('login-erro').classList.add('hidden');

}

document.getElementById('login-senha').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        tentarLogin();
    } 
});

window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('logado') === 'true') {
        iniciarSistema();
    }
});
