const API_URL = 'http://localhost:3000/alunos';

const form = document.getElementById('form-aluno');

const listaAlunos = document.getElementById('lista-alunos');

async function listarAlunos() {
    
    const resposta = await fetch(API_URL);

    const alunos = await resposta.json();

    listaAlunos.innerHTML = '';

    alunos.forEach((aluno) => {


        listaAlunos.innerHTML += `
        
        <div class="aluno">
             <h3>${aluno.nome}</h3> 
             <p>Email: ${aluno.email}</p>
              <button onclick="deletarAluno(${aluno.id})"> 
                Deletar </button> 
              
              </div>;`
           

        
        });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const novoAluno = {
        nome: document.getElementById('nome').value,

        email: document.getElementById('email').value,

        data_nascimento: document.getElementById('data_nascimento').value
    };

    await fetch(API_URL, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(novoAluno)
    });

    form.reset();

    listarAlunos();


});

async function deletarAluno(id) {
    
    await fetch(`${API_URL}/${id}`, {

        method: 'DELETE'
    });

    listarAlunos();
}

listarAlunos();