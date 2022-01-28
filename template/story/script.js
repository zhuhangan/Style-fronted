const jokeEl = document.getElementById('joke')
const titleEL = document.getElementById('title')
const jokeBtn = document.getElementById('jokeBtn')
const backHome = document.getElementById('backHome')
const loadContainer = document.getElementById('load-container')

jokeBtn.addEventListener('click', generateJoke)
backHome.addEventListener('click', backHomeClick);
//替换指定传入参数的值,url为地址,paramName为参数,replaceWith为新值
const  replaceParamVal = (url,arg,old,arg_val)=> {
  var pattern=arg+'=([^&]*)';
  var replaceText=arg+'='+arg_val;
  var oldText=arg+'='+old;
  if(url.match(pattern)){
    var tmp='/('+ arg+'=)([^&]*)/gi';
    tmp=url.replace(oldText,replaceText);
    return tmp;
  }else{
    if(url.match('[\?]')){
      return url+'&'+replaceText;
    }else{
      return url+'?'+replaceText;
    }
  }
}

const getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
        ),
        {}
    );
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
    let param = await getURLParameters(window.location.href);
    let id = Number(param.id || 1);
    let nextId = id+1;
    const nextURL = replaceParamVal(window.location.href,"id",id,nextId);
    const nextTitle = '下一个故事';
    const nextState = { nextId: nextId };
    window.history.replaceState(nextState, nextTitle, nextURL);
    let url = 'https://api.yyuan.wang/story/detail/'+id
  const res = await fetch(url, config);
  const re = await res.json();
    data.push(re);
    if (culength <= 0) {
      loadContainer.style.display = 'none'
      jokeEl.style.display = 'block'
      let story  = data.pop();
      jokeEl.innerHTML = story.content;
      titleEL.innerHTML = story.title;

    }
  }
}


async function backHomeClick(){
   window.location.href ="https://baby.yyuan.wang/pokedex/index.html"
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
