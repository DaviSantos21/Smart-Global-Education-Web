const API_MENSAGENS = 'http://localhost:3000/mensagens';

document.getElementById('form-mensagem').addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = document.getElementById('nome-msg').value.trim();
    const email = document.getElementById('email-msg').value.trim();
    const assunto = document.getElementById('assunto-msg').value.trim();
    const mensagem = document.getElementById('mensagem-msg').value.trim();

    if (!nome || !email || !assunto || !mensagem) {

        alert('Preencha todos os campos.');

        return;

    }

    try {

        const resposta = await fetch(API_MENSAGENS, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ nome, email, assunto, mensagem })

        });

        if (!resposta.ok) {
            throw new Error('Erro ao enviar mensagem');
        }

        document.getElementById('form-mensagem').reset();

        carregarMensagens();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível enviar a mensagem. Tente novamente.');

    }

});

async function carregarMensagens(){

    const tabela = document.getElementById('tabela-mensagens');

    try {

        const resposta = await fetch(API_MENSAGENS);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar mensagens');
        }

        const mensagens = await resposta.json();

        tabela.innerHTML = '';

        if (mensagens.length === 0) {

            tabela.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        Nenhuma mensagem recebida.
                    </td>
                </tr>
            `;

            return;

        }

        mensagens.forEach(msg => {

            tabela.innerHTML += `
            <tr>
                <td data-label="Nome">${msg.nome}</td>
                <td data-label="Assunto">${msg.assunto}</td>
                <td data-label="Data">${new Date(msg.data_envio).toLocaleDateString()}</td>
            </tr>
            `;

        });

    } catch (erro) {

        console.error('Erro ao carregar mensagens:', erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="3" style="text-align:center;">
                    Erro ao carregar mensagens. Tente novamente.
                </td>
            </tr>
        `;

    }

}

carregarMensagens();
