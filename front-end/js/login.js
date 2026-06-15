const USUARIO_VALIDO = 'admin';
const SENHA_VALIDA   = '1234';

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

function tentarLogin() {

    const usuario = document.getElementById('login-usuario').value.trim();
    const senha   = document.getElementById('login-senha').value;
    const erro    = document.getElementById('login-erro');

    if (usuario === USUARIO_VALIDO && senha === SENHA_VALIDA) {

        sessionStorage.setItem('logado', 'true');
        iniciarSistema();

    } else {

        erro.textContent = 'Usuário ou senha incorretos.';
        erro.classList.remove('hidden');

        document.getElementById('login-senha').value = '';
        document.getElementById('login-senha').focus();

    }

}

function logout() {

    sessionStorage.removeItem('logado');

    document.getElementById('tela-sistema').classList.add('hidden');
    document.getElementById('tela-login').classList.remove('hidden');

    document.getElementById('login-usuario').value = '';
    document.getElementById('login-senha').value   = '';
    document.getElementById('login-erro').classList.add('hidden');

}

document.getElementById('login-senha').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tentarLogin();
});

window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('logado') === 'true') {
        iniciarSistema();
    }
});
