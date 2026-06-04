function executar(callback) {

    callback("Olá", "Mundo!");

}

executar((a,b) => {

console.log(a);
console.log(b);

});