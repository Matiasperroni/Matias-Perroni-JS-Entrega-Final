
const pokemonContainer = document.querySelector(".pokemon-container");



function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res=> res.json())
    .then(data => {
        crearPokemon(data);
    })
};

function fetchPokemons(number){
    for(let i = 1; i <= number; i++){
        fetchPokemon(i);
    }
};


function crearPokemon(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const contContainer = document.createElement("div");
    contContainer.classList.add("img-container");

    const imagen = document.createElement("img");
    //sprites.front_default es una de las propiedades que trae el objeto de cada pokemon, este tiene el url de la imagen
    imagen.src = pokemon.sprites.front_default;

    contContainer.appendChild(imagen);
    
    const numero = document.createElement("p");
    numero.textContent = `#${pokemon.id}`;

    const nombre = document.createElement("p");
    nombre.classList.add("nombre");
    nombre.textContent = pokemon.name;

    card.appendChild(contContainer);
    card.appendChild(numero);
    card.appendChild(nombre);
    pokemonContainer.appendChild(card);
};
fetchPokemons(10);