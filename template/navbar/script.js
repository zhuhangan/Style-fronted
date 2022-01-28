const poke_container = document.getElementById('recommed-container')
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
    const url = `https://api.yyuan.wang/picstory/all`
    const res = await fetch(url)
    const resData = await res.json();
    for (let i = 0; i < resData.length && i<10; i++) {
        let data = resData[i];
        createPokemonCard(data,i)
    }
}

const createPokemonCard = (pokemon,index) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.title;
    let tag = pokemon.tag;
    const id = pokemon.id;
    const brief = pokemon.brief;
    const cover = pokemon.cover;
    const color = colors[index]
   // pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="d-flex  text-muted pt-3 border-bottom">
       <div class="img-container border-bottom align-items-baseline">
       <img src="${cover}"  class="p2 img-fluid img-thumbnail " alt="1">
        </div>
       <div class="pb-3 p-2 mb-0 small lh-sm  w-100">
         <div class="d-flex justify-content-between">
           <strong class="text-gray-dark">${name}</strong>
         </div>
         <div class="mb-0 small lh-sm   ">
          ${brief} 
         </div>
           <a href="https://baby.yyuan.wang/story/index.html?id=${id}&type=pic" class=" align-items-baseline link-blue pb-2">开始阅读</a>
       </div>
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
