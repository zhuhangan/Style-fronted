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

     window.open(url, '_blank');
 }

const fetchPokemons = async () => {
        await getPokemon()
}

const getPokemon = async () => {
    let param = await getURLParameters(window.location.href);
    let type = param.type || 'huiben';
    //  const url = `https://api.yyuan.wang/story/all/${id}`
    const url = `https://api.yyuan.wang/story/${type}/all`
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
    const id = pokemon.id;
    let cover = pokemon.cover;

    const color = colors[Math.round(Math.random() * 10)];

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container  story-div ">
        <img src="${cover}" alt="${name}">
    </div>
    <div class="info">
        <span class="storyId">${id}</span>
        <h4  class="long-text name">${name}</h4>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl);
    pokemonEl.addEventListener('click', (e)=>{
        jumpToDetail(e)
    });
}
const getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
        ),
        {}
    );
fetchPokemons().then(r => {




})
