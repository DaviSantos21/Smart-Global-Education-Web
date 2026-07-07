const API_TURMAS = 'http://localhost:3000/turmas';

const formTurma = document.getElementById('form-turma');

async function carregarTurmas(){

    const lista = document.getElementById('lista-turmas');

    try {

        const resposta = await fetchAutenticado(API_TURMAS);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar turmas');
        }

        const turmas = await resposta.json();

        lista.innerHTML = '';

        if (turmas.length === 0) {

            lista.innerHTML = `<p>Nenhuma turma cadastrada.</p>`;

            return;

        }

        turmas.forEach(turma => {

            lista.innerHTML += `
                <div class="card">
                    <h3>${turma.nome}</h3>
                    <p>Turno: ${turma.turno}</p>
                    <p>Ano: ${turma.ano}</p>
                </div>
            `;

        });

    } catch (erro) {

        console.error('Erro ao carregar turmas:', erro);

        lista.innerHTML = `<p>Erro ao carregar turmas. Tente novamente.</p>`;

    }

}

formTurma.addEventListener('submit', async (event) => {

    event.preventDefault();

    const nome = document.getElementById('nome-turma').value.trim();
    const turno = document.getElementById('turno-turma').value.trim();
    const ano = document.getElementById('ano-turma').value;

    if (!nome || !turno || !ano) {

        alert('Preencha todos os campos.');

        return;

    }

    const turma = { nome, turno, ano };

    try {

        const resposta = await fetchAutenticado(API_TURMAS, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(turma)

        });

        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar turma');
        }

        formTurma.reset();

        carregarTurmas();

    } catch (erro) {

        console.error(erro);

        alert('Não foi possível cadastrar a turma. Tente novamente.');

    }

});

carregarTurmas();
