const poke_container = document.getElementById('poke-container')
const pokemon_count = 1
const colors = [
    '#FDDFDF',
    '#DEFDE0',
    '#FCF7DE',
    '#DEF3FD',
    '#f4e7da',
    '#d5d5d4',
    '#fceaff',
    '#98d7a5',
    '#f8d5a3',
    '#97b3e6',
    '#eaeda1',
    '#F5F5F5',
    '#E6E0D4',
    '#F5F5F5'
]

const main_types = Object.keys(colors)
document.addEventListener('click', jumpToDetail)

async function jumpToDetail(){
    window.location.href ="https://baby.yyuan.wang/dad-jokes/index.html"
}

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    //  const url = `https://api.yyuan.wang/story/all/${id}`
    const url = `https://api.yyuan.wang/story/all`
    const res = await fetch(url)
    const resData = await res.json();
    for (let i = 0; i < resData.length; i++) {
        let data = resData[i];
        createPokemonCard(data)
    }
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.title;
    const id = pokemon.id;
    const poke_types = 111;
    const type = 1;
    const color = colors[Math.round(Math.random() * 10)]

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container center story-div ">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="storyId">#${id}</span>
        <h4  class="long-text name">${name}</h4>
        <small class="标签">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()
