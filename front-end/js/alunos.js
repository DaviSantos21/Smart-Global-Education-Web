const API_ALUNOS = 'http://localhost:3000/alunos';

let alunoEditando = null;

async function carregarAlunos(){

    try {

        const resposta = await fetch(API_ALUNOS);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar alunos');
        }

        const alunos = await resposta.json();

        const tabela = document.getElementById('tabela-alunos');

        tabela.innerHTML = '';

        if (alunos.length === 0) {

            tabela.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;">
                        Nenhum aluno cadastrado.
                    </td>
                </tr>
            `;

            return;

        }

        alunos.forEach((aluno, index) => {

            tabela.innerHTML += `
                <tr>
                    <td data-label="ID">${index + 1}</td>
                    <td data-label="Nome">${aluno.nome}</td>
                    <td data-label="Email">${aluno.email}</td>
                    <td data-label="Idade">${aluno.idade}</td>
                    <td data-label="Ações">
                        <button
                            aria-label="Editar aluno ${aluno.nome}"
                            onclick="editarAluno(${aluno.id}, '${aluno.nome}', '${aluno.email}', '${aluno.data_nascimento}')">
                            ✏️
                        </button>
                        <button
                            aria-label="Excluir aluno ${aluno.nome}"
                            onclick="excluirAluno(${aluno.id})">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (erro) {

        console.error('Erro ao carregar alunos:', erro);

        const tabela = document.getElementById('tabela-alunos');

        tabela.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Erro ao carregar alunos. Tente novamente.
                </td>
            </tr>
        `;

    }

}

const formAluno = document.getElementById('form-aluno');

formAluno.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = document.getElementById('nome-aluno').value.trim();
    const email = document.getElementById('email-aluno').value.trim();
    const data_nascimento = document.getElementById('data_nascimento-aluno').value;

    if (!nome || !email || !data_nascimento) {

        alert('Preencha todos os campos.');

        return;

    }

    const aluno = { nome, email, data_nascimento };

    try {

        if (alunoEditando) {

            const resposta = await fetch(`${API_ALUNOS}/${alunoEditando}`, {

                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(aluno)

            });

            if (!resposta.ok) {
                throw new Error('Erro ao atualizar aluno');
            }

            alunoEditando = null;

            alert('Aluno atualizado com sucesso.');

        } else {

            const resposta = await fetch(API_ALUNOS, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(aluno)

            });

            if (!resposta.ok) {
                throw new Error('Erro ao cadastrar aluno');
            }

            alert('Aluno cadastrado com sucesso.');

        }

        formAluno.reset();

        carregarAlunos();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível salvar o aluno. Tente novamente.');

    }

});

function editarAluno(id, nome, email, data_nascimento){

    alunoEditando = id;

    document.getElementById('nome-aluno').value = nome;
    document.getElementById('email-aluno').value = email;
    document.getElementById('data_nascimento-aluno').value = data_nascimento.substring(0, 10);

    document.getElementById('nome-aluno').focus();

}

async function excluirAluno(id){

    const confirmar = confirm('Deseja excluir este aluno?');

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(`${API_ALUNOS}/${id}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao excluir aluno');
        }

        carregarAlunos();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível excluir o aluno. Tente novamente.');

    }

}

carregarAlunos();
