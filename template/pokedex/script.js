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

 const jumpToDetail =  (e) => {
    let id  =  e.currentTarget.querySelector(".storyId").innerText;
     let url = "https://baby.yyuan.wang/story/index.html?id="+id;

     window.open(url, '_blank').focus();
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
    for (let i = 0; i < resData.length && i<100; i++) {
        let data = resData[i];
        createPokemonCard(data)
    }
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.title;
    let tag = pokemon.tag;
    tag = tag.replace("相关标签", "标签");
    const id = pokemon.id;
    const color = colors[Math.round(Math.random() * 10)]

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container center story-div ">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="storyId">${id}</span>
        <h4  class="long-text name">${name}</h4>
        <small class="tag"<span>${tag}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons().then(r => {

    poke_container.addEventListener('click', (e)=>{
        jumpToDetail(e)
    }

)
})
