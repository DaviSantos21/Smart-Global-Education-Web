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

        formAluno.reset();

        carregarAlunos();

    }
);

carregarAlunos();