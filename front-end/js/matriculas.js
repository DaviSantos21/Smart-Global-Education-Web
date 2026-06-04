const API_MATRICULAS =
'http://localhost:3000/matriculas';

async function carregarSelects(){

    const alunos =
    await fetch(
        'http://localhost:3000/alunos'
    );

    const turmas =
    await fetch(
        'http://localhost:3000/turmas'
    );

    const listaAlunos =
    await alunos.json();

    const listaTurmas =
    await turmas.json();

    const selectAluno =
    document.getElementById(
        'aluno-select'
    );

    const selectTurma =
    document.getElementById(
        'turma-select'
    );

    selectAluno.innerHTML = '';

    selectTurma.innerHTML = '';

    listaAlunos.forEach(aluno=>{

        selectAluno.innerHTML += `
            <option value="${aluno.id}">
                ${aluno.nome}
            </option>
        `;

    });

    listaTurmas.forEach(turma=>{

        selectTurma.innerHTML += `
            <option value="${turma.id}">
                ${turma.nome}
            </option>
        `;

    });

}

document
.getElementById('form-matricula')
.addEventListener(
'submit',
async(event)=>{

    event.preventDefault();

    await fetch(
        API_MATRICULAS,
        {

            method:'POST',

            headers:{
                'Content-Type':
                'application/json'
            },

            body:JSON.stringify({

                alunoId:
                document.getElementById(
                    'aluno-select'
                ).value,

                turmaId:
                document.getElementById(
                    'turma-select'
                ).value

            })

        }
    );

    carregarSelects();

});