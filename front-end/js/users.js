const API_USERS = 'http://localhost:3000/users';

async function carregarUsers() {

    const tabela = document.getElementById('tabela-users');

    try {

        const resposta = await fetchAutenticado(API_USERS);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar usuários');
        }

        const users = await resposta.json();

        tabela.innerHTML = '';

        if(users.length === 0){

            tabela.innerHTML = `
            <tr>
                 <td colspan=5 style="text-align:center;">
                 Nenhum usuário encontrado.
                 </td> 
            </tr>  
            `;

            return;
        }

        users.forEach((user, index) => {
            tabela.innerHTML += `
            <tr>
               <td data-label="Nº">${index + 1}</td>
               <td data-label="Nome">${user.nome}</td>
               <td data-label="Email">${user.email}</td>
               <td data-label="Nível">${user.acesso}</td>
               <td data-label="Ações">
                   <button onclick="excluir(${user.id})">🗑️</button>
                </td>

            </tr>
            
            `;
        });
        
    } catch (erro) {

        console.error('Erro ao carregar usuários:', erro);
        
    }
    
}

document.getElementById('form-user').addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = document.getElementById('nome-user-input').value.trim();
    const email = document.getElementById('email-user').value.trim();
    const senha = document.getElementById('senha-user').value;
    const acesso = document.getElementById('acesso-user').value;

    if (!nome || !email || !senha || !acesso) {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        const resposta = await fetchAutenticado(API_USERS, {
            method: 'POST',
            body: JSON.stringify({nome, email, senha, acesso})
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Erro ao cadastrar usuário.');
            
            return;
        }

        document.getElementById('form-user').reset();
        carregarUsers();

    } catch (erro) {
        console.error(erro);
        alert('Não foi possível cadastrar usuário.');
    }
});

async function excluir(id) {
    
    const confirmar = confirm('Deseja excluir este usuário?');

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetchAutenticado(`${API_USERS}/${id}`, {
            method: 'DELETE'
        });

        const dados = await resposta.json();
        
        if (!resposta.ok) {
            throw new Error("Erro ao deletar usuário.");
            return;
        }

        carregarUsers();

    } catch (erro) {
        console.error(erro);
        alert('Não foi possível excluir o usuário');
    }
}