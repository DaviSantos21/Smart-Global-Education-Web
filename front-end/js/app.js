const API_ONLINE = window.location.hostname === 'localhost' ||
                   window.location.hostname === '127.0.0.1'
                   ? 'http://localhost:3000' 
                   : 'https://sgew-production.up.railway.app';

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