const API_ALUNOS = 'http://localhost:3000/alunos';

async function carregarAlunos(){

    try {

        const resposta = await fetchAutenticado(API_ALUNOS);

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
                            onclick="abrirEditor(${aluno.id}, '${aluno.nome}', '${aluno.email}', '${aluno.data_nascimento}')">
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

            const resposta = await fetchAutenticado(API_ALUNOS, {

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

        

        formAluno.reset();

        carregarAlunos();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível salvar o aluno. Tente novamente.');

    }

});



function abrirEditor(id, nome, email, data_nascimento){

     document.getElementById('modal-editar-id').value = id;
    document.getElementById('modal-editar-nome').value = nome;
    document.getElementById('modal-editar-email').value = email;
    document.getElementById('modal-editar-nascimento').value = data_nascimento.substring(0, 10);

    document.getElementById('modal-editar-aluno').classList.remove('hidden');
    document.getElementById('modal-editar-nome').focus();

}

function fecharModalEditor(){ 
    document.getElementById('modal-editar-aluno').classList.add('hidden');
    document.getElementById('form-editar-aluno').reset();

}

document.getElementById('modal-editar-aluno').addEventListener('click', (event) => {
        if(event.target === document.getElementById('modal-editar-aluno')){
            fecharModalEditor();
            
        }
    });


    document.getElementById('form-editar-aluno').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('modal-editar-id').value;
        const nome = document.getElementById('modal-editar-nome').value.trim();
        const email = document.getElementById('modal-editar-email').value.trim();
        const data_nascimento = document.getElementById('modal-editar-nascimento').value;

        try{

            const resposta = await fetchAutenticado(`${API_ALUNOS}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({nome, email, data_nascimento})
            });

            if(!resposta.ok){
                throw new Error('Erro ao atualizar aluno');
                fecharModalEditor();
                carregarAlunos();
            }

            alert('Aluno atualizado com sucesso.');

            fecharModalEditor();
            carregarAlunos();

        } catch (erro) {

            console.error(erro);
            alert('Não foi possível atualizar o aluno. Tente novamente.');
        }
    });


async function excluirAluno(id){

    const confirmar = confirm('Deseja excluir este aluno?');

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetchAutenticado(`${API_ALUNOS}/${id}`, {
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
