const API_ALUNOS =
'http://localhost:3000/alunos';

async function carregarAlunos(){

    const resposta =
        await fetch(API_ALUNOS);

    const alunos =
        await resposta.json();

    const lista =
        document.getElementById(
            'lista-alunos'
        );

    lista.innerHTML = '';

    alunos.forEach(aluno => {

        lista.innerHTML += `

            <div class="card">

                <h3>${aluno.nome}</h3>

                <p>${aluno.email}</p>

                <p>${aluno.idade}</p>

                <br>

                <button class="btn-excluir" onclick="excluirAluno(${aluno.id})">Excluir</button>

                        <button onclick="atualizarAluno(${aluno.id})">Editar</button>

            </div>

        `;

    });

}

const formAluno =
    document.getElementById('form-aluno');

formAluno.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const aluno = {

            nome:
                document.getElementById(
                    'nome-aluno'
                ).value,

            email:
                document.getElementById(
                    'email-aluno'
                ).value,

            data_nascimento:
                document.getElementById(
                    'data_nascimento-aluno'
                ).value
        };

        await fetch(API_ALUNOS, {

            method: 'POST',

            headers: {
                'Content-Type':
                    'application/json'
            },

            body:
                JSON.stringify(aluno)

        });

        alert('Aluno cadastrado com sucesso.')

        formAluno.reset();

        carregarAlunos();



    }
);

async function excluirAluno(id){

    await fetch(
        `${API_ALUNOS}/${id}`,
        {
            method:'DELETE'
        }
    );

    carregarAlunos();

}

carregarAlunos();