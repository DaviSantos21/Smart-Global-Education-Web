const API_ALUNOS =
'http://localhost:3000/alunos';

let alunoEditando = null;

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

                        <button onclick="editarAluno(${aluno.id},
                        '${aluno.nome}',
                        '${aluno.email}',
                        '${aluno.data_nascimento}')">Editar</button>

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

        if(alunoEditando) {

            await fetch(`${API_ALUNOS}/${alunoEditando}`, 
                
                {
                    method: 'PUT',

                    headers: {
                        'Content-type': 'application/json'
                    },

                    body: JSON.stringify(aluno)
                }
            );

        }

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

function editarAluno(id, nome, email, data_nascimento){

    alunoEditando = id;

    document.getElementById('nome-aluno').valur = nome;

    document.getElementById('email-aluno').value = email;

    document.getElementById('data_nascimento-aluno').value = data_nascimento;

    
}

async function excluirAluno(id){

    const confirmar = confirm('Deseja excluir este aluno?');

    if(!confirm){

        return;
    }

    await fetch(
        `${API_ALUNOS}/${id}`,
        {
            method:'DELETE'
        }
    );

    carregarAlunos();

}

carregarAlunos();