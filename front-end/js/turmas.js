const API_TURMAS =
'http://localhost:3000/turmas';

const formTurma =
document.getElementById('form-turma');

async function carregarTurmas(){

    const resposta =
    await fetch(API_TURMAS);

    const turmas =
    await resposta.json();

    const lista =
    document.getElementById(
        'lista-turmas'
    );

    lista.innerHTML = '';

    turmas.forEach(turma => {

        lista.innerHTML += `

            <div class="card">

                <h3>${turma.nome}</h3>

                <p>${turma.turno}</p>

                <p>${turma.ano}</p>

            </div>

        `;

    });

}

formTurma.addEventListener(
    'submit',
    async(event)=>{

        event.preventDefault();

        const turma = {

            nome:
            document.getElementById(
                'nome-turma'
            ).value,

            turno:
            document.getElementById(
                'turno-turma'
            ).value,

            ano:
            document.getElementById(
                'ano-turma'
            ).value

        };

        await fetch(API_TURMAS,{

            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:
            JSON.stringify(turma)

        });

        formTurma.reset();

        carregarTurmas();

    }
);

carregarTurmas();