const API_ALUNOS =
'http://localhost:3000/alunos';

let alunoEditando = null;

async function carregarAlunos(){

    const resposta =
        await fetch(API_ALUNOS);

    const alunos =
        await resposta.json();

    const tabela =
        document.getElementById(
            'tabela-alunos'
        );

    tabela.innerHTML = '';

    alunos.forEach(aluno => {

        tabela.innerHTML += `

          
            <tr>

                <td>${aluno.id}</td>

                <td>${aluno.nome}</td>

                <td>${aluno.email}</td>

                <td>${aluno.idade}</td>

                <td>

                    <button
                        onclick="
                        editarAluno(
                            ${aluno.id},
                            '${aluno.nome}',
                            '${aluno.email}',
                            ${aluno.idade}
                        )">

                        Editar

                    </button>

                    <button
                        onclick="
                        excluirAluno(
                            ${aluno.id}
                        )">

                        Excluir

                    </button>

                </td>

            </tr>

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

            alunoEditando = null;

        }

        else{

            await fetch(

                API_ALUNOS,

                {

                    method:'POST',

                    headers:{
                        'Content-Type':
                        'application/json'
                    },

                    body:
                    JSON.stringify(aluno)

                }

            );

        }

        alert('Aluno cadastrado com sucesso.')

        formAluno.reset();

        carregarAlunos();



    }
);

function editarAluno(id, nome, email, data_nascimento){

    alunoEditando = id;

    document.getElementById('nome-aluno').value = nome;

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