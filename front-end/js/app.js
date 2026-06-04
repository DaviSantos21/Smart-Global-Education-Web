function mostrarPagina(id){

    const secoes = document.querySelectorAll('section');

    secoes.forEach(secao => {

        secao.style.display = 'none';

    });

    document.getElementById(id).style.display = 'block';

}