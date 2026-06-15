async function carregarDashboard(){

    const alunos = await (await fetch('http://localhost:3000/alunos')).json();
    const turmas = await (await fetch('http://localhost:3000/turmas')).json();
    const matriculas = await (await fetch('http://localhost:3000/matriculas')).json();
    const mensagens = await (await fetch('http://localhost:3000/mensagens')).json();

    document.getElementById('total-alunos').innerText = alunos.length;
    document.getElementById('total-turmas').innerText = turmas.length;
    document.getElementById('total-matriculas').innerText = matriculas.length;
    document.getElementById('total-mensagens').innerText = mensagens.length;

}

carregarDashboard();