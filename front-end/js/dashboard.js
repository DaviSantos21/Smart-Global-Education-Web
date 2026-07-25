async function carregarDashboard(){

    const alunos = await (await fetchAutenticado(`${API_ONLINE}/alunos`)).json();
    const turmas = await (await fetchAutenticado(`${API_ONLINE}/turmas`)).json();
    const matriculas = await (await fetchAutenticado(`${API_ONLINE}/matriculas`)).json();
    const mensagens = await (await fetchAutenticado(`${API_ONLINE}/mensagens`)).json();

    document.getElementById('total-alunos').innerText = alunos.length;
    document.getElementById('total-turmas').innerText = turmas.length;
    document.getElementById('total-matriculas').innerText = matriculas.length;
    document.getElementById('total-mensagens').innerText = mensagens.length;

}

carregarDashboard();