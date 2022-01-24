const jokeEl = document.getElementById('joke')
const titleEL = document.getElementById('title')
const jokeBtn = document.getElementById('jokeBtn')

jokeBtn.addEventListener('click', generateJoke)

data =[];
let promise = generateJoke();
// USING ASYNC/AWAIT
async function generateJoke() {
  if (data.length > 0) {
    let story  = data.pop();
    jokeEl.innerHTML = story.content;
    titleEL.innerHTML = story.title;
  }
  let culength = data.length;
  if (data.length  <= 1) {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  const res = await fetch('https://api.yyuan.wang/story/all', config)
  const re = await res.json();
    data.push(...re);
    if (culength <= 0) {
      let story  = data.pop();
      jokeEl.innerHTML = story.content;
      titleEL.innerHTML = story.title;

    }
  }
}

// USING .then()
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   }

//   fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeEl.innerHTML = data.joke
//     })
// }
