const input = document.getElementById("pokemon");
const search = document.getElementById("search");
const container = document.querySelector(".result");
const api = "https://pokeapi.co/api/v2/pokemon/";



search.addEventListener("click", () => {
    if (input.value != "") {
        fetchPokemon()
    } else {
        fetchPokemons()
    }
});



async function fetchPokemon() {
    const pokemondatas = await fetch(api + input.value).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                if (response.status === 404) {
                    throw new Error("Pokemon not found!");
                }
            }
        })

        .catch((error) => {
            container.innerHTML = `<div class="item"><p>${error.toString().substring(6)}</p></div>`;
        });

    console.log(pokemondatas);

    let write = `<div class="item"><img src='${pokemondatas.sprites.front_default}' alt='${pokemondatas.name}'/><p>${pokemondatas.name}</p><div>`;
    container.innerHTML = write;
}



async function fetchPokemons() {
    const pokemondatas = await fetch(api).then((response) => {
            if (response.ok) {
                return response.json();
            }
        })

        .catch((error) => {
            container.innerHTML = `<div class="item"><p>${error.toString().substring(6)}</p></div>`;
        });

    console.log(pokemondatas);

    let write = "";
    pokemondatas.results.forEach((item) => {
        write += `<div class="item"><p>${item.name}</p><a href='${item.url}' target='_blank'><i> ${item.url}</i></a></div>`;
    });
    container.innerHTML = write;
}