const API_MATRICULAS = 'http://localhost:3000/matriculas';

async function carregarSelects(){

    const selectAluno = document.getElementById('aluno-select');
    const selectTurma = document.getElementById('turma-select');

    try {

        const [alunosResp, turmasResp] = await Promise.all([
            fetch('http://localhost:3000/alunos'),
            fetch('http://localhost:3000/turmas')
        ]);

        if (!alunosResp.ok || !turmasResp.ok) {
            throw new Error('Erro ao buscar dados para os selects');
        }

        const listaAlunos = await alunosResp.json();
        const listaTurmas = await turmasResp.json();

        selectAluno.innerHTML = '';
        selectTurma.innerHTML = '';

        if (listaAlunos.length === 0) {

            selectAluno.innerHTML = `<option value="">Nenhum aluno cadastrado</option>`;

        } else {

            listaAlunos.forEach(aluno => {

                selectAluno.innerHTML += `<option value="${aluno.id}">${aluno.nome}</option>`;

            });

        }

        if (listaTurmas.length === 0) {

            selectTurma.innerHTML = `<option value="">Nenhuma turma cadastrada</option>`;

        } else {

            listaTurmas.forEach(turma => {

                selectTurma.innerHTML += `<option value="${turma.id}">${turma.nome}</option>`;

            });

        }

    } catch (erro) {

        console.error('Erro ao carregar selects:', erro);

    }

}

async function carregarMatriculas(){

    const tabela = document.getElementById('tabela-matriculas');

    try {

        const resposta = await fetch(API_MATRICULAS);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar matrículas');
        }

        const matriculas = await resposta.json();

        tabela.innerHTML = '';

        if (matriculas.length === 0) {

            tabela.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">
                        Nenhuma matrícula registrada.
                    </td>
                </tr>
            `;

            return;

        }

        matriculas.forEach(m => {

            tabela.innerHTML += `
            <tr>
                <td data-label="ID">${m.id}</td>
                <td data-label="Aluno">${m.aluno}</td>
                <td data-label="Turma">${m.turma}</td>
                <td data-label="Data">${new Date(m.data_matricula).toLocaleDateString()}</td>
            </tr>
            `;

        });

    } catch (erro) {

        console.error('Erro ao carregar matrículas:', erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    Erro ao carregar matrículas. Tente novamente.
                </td>
            </tr>
        `;

    }

}

document.getElementById('form-matricula').addEventListener('submit', async (event) => {

    event.preventDefault();

    const alunoId = document.getElementById('aluno-select').value;
    const turmaId = document.getElementById('turma-select').value;

    if (!alunoId || !turmaId) {

        alert('Selecione um aluno e uma turma.');

        return;

    }

    try {

        const resposta = await fetch(API_MATRICULAS, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ alunoId, turmaId })

        });

        if (!resposta.ok) {
            throw new Error('Erro ao registrar matrícula');
        }

        carregarMatriculas();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível registrar a matrícula. Tente novamente.');

    }

});

carregarSelects();
carregarMatriculas();
