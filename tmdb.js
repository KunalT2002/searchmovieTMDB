let j=0;
let btn=document.querySelector('.show');
btn.style.display="none";

let sug=document.getElementById('sug');
let s=document.querySelector('.s');
s.addEventListener('click',()=>{
    sug.innerHTML="";
    j=0;
})

async function a(){
    let srch=document.getElementById('srch').value;
    btn.style.display="block";
    j=j+1;
    console.log(j);
    let api=`https://api.themoviedb.org/3/search/movie?api_key=bf120023c7b06e0129123be41a466fe6&&query=${srch}&page=${j}`;
    let a=await fetch(`${api}`);
    let data=await a.json()
    console.log(data);
    let movies=data.results;
    for (let i = 0; i < movies.length; i++){
        let im=`https://image.tmdb.org/t/p/w500/${movies[i].poster_path}`;
        sug.innerHTML +=`
        <div class="dis" onclick="b(this)">
        <p class="id">${movies[i].id}</p>
        <img class="img" src="${im}" alt="">
        <div class="dtl">
        <p class="name">Movie: ${movies[i].original_title}</p>
        <p class="date">Release: ${movies[i].release_date}</p>
        </div>
        </div>
        `;     
    }
}

async function b(e){
    // console.log(e.firstChild.nextSibling.innerHTML);
    let mid=e.firstChild.nextSibling.innerHTML;
    let api=`https://api.themoviedb.org/3/movie/${mid}?api_key=bf120023c7b06e0129123be41a466fe6`;
    let a=await fetch(`${api}`);
    let data=await a.json()
    console.log(data);
    sug.innerHTML="";
    let grn=data.genres;
    let ge="";
    grn.map((b)=>{
        ge+=`${b.name}, `;
    })
    let im=`https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    let vid=`https://api.themoviedb.org/3/movie/${mid}/videos?api_key=bf120023c7b06e0129123be41a466fe6`;
        sug.innerHTML +=`
        <div class="sho">
        <img class="img" src="${im}" alt="">
        <div class="dtl">
        <p class="name">Movie: ${data.original_title}</p>
        <p class="date">Release: ${data.release_date}</p>
        <p class="gen">genres: ${ge}</p>
        <p class="vid">${vid}</p>
        </div>
        </div>
        `;   
}


async function home(heading,topic){
    let api=`https://api.themoviedb.org/3/movie/${topic}?api_key=bf120023c7b06e0129123be41a466fe6`;
    let hm=document.querySelector('#hm');
    let tr=document.querySelector('#demo');
    let da= await fetch(`${api}`)
    let data=await da.json();
    hm.innerHTML +=`<h1 class="h">${heading}</h1>`;
    let resu=data.results;
    console.log(data);
    resu.map((e)=>{
        let im=`https://image.tmdb.org/t/p/w500/${e.poster_path}`;
        tr.innerHTML +=`
        <div class="dis">
        <img class="img" src="${im}" alt="">
        <div class="dtl">
        <p class="name">Movie: ${e.title}</p>
        <p class="date">Release: ${e.release_date}</p>
        </div>
        </div>
        `;
    })
    hm.innerHTML +=`<div class="sg">${tr.innerHTML}</div>`;
    tr.innerHTML ="";
    // console.log(hm.innerHTML);
      

}

home("Now playing","now_playing");
home("Popular","popular");
home("top rated","top_rated");
home("upcomeing","upcoming");



