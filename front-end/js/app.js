function mostrar(id){

    document.querySelectorAll('.page')
        .forEach(p => p.classList.add('hidden'));

    document.getElementById(id)
        .classList.remove('hidden');

    document.querySelectorAll('.sidebar button')
        .forEach(btn => btn.classList.remove('ativo'));

    document.querySelector(`.sidebar button[data-page="${id}"]`)
        ?.classList.add('ativo');

}

document.addEventListener('DOMContentLoaded', () => {

    mostrar('dashboard');

});


function fetchAutenticado(url, options = {}){

    const token = sessionStorage.getItem('token');

    return fetch(url,
         {...options,
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
                ...options.headers
             } });
             
}