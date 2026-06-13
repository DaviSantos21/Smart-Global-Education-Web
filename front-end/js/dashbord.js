async function carregarDashboard(){

    const alunos =
        await fetch(
            'http://localhost:3000/alunos'
        );

    const turmas =
        await fetch(
            'http://localhost:3000/turmas'
        );

    const matriculas =
        await fetch(
            'http://localhost:3000/matriculas'
        );

    const mensagens =
        await fetch(
            'http://localhost:3000/mensagens'
        );

    const listaAlunos =
        await alunos.json();

    const listaTurmas =
        await turmas.json();

    const listaMatriculas =
        await matriculas.json();

    const listaMensagens =
        await mensagens.json();

    document.getElementById(
        'total-alunos'
    ).textContent =
    listaAlunos.length;

    document.getElementById(
        'total-turmas'
    ).textContent =
    listaTurmas.length;

    document.getElementById(
        'total-matriculas'
    ).textContent =
    listaMatriculas.length;

    document.getElementById(
        'total-mensagens'
    ).textContent =
    listaMensagens.length;

}

carregarDashboard();