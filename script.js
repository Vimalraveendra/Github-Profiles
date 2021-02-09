const API_URL ='https://api.github.com/users/'

const formEl = document.getElementById('form')
const mainEl = document.getElementById('main')
const searchEl=document.getElementById('search')

async function getUsers(url,userName){
   const resp = await fetch(url+userName);
   const userData = await resp.json()
   if(userData.message!=='Not Found'){
   createGitProfile(userData)
   }
}

getUsers(API_URL,"John")

function createGitProfile(user){
    const {avatar_url,name,followers, following,public_repos,bio}= user
    // clear the container
    mainEl.innerHTML = '';
    // if(avatar_url||name||followers|| following||public_repos||bio===undefined){
    //     return ;
    // }
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')
    cardEl.innerHTML=`
            <div class="img-container">
            <img src= "${avatar_url}" class="img" alt="">
            </div>
            <div class='user-info'>
                <h2>${name}</h2>
                <p>${bio}</p>
                <ul class='list'>
                    <li><i class="fas fa-eye"></i>${followers}</li>
                    <li><i class="fas fa-heart"></i>${following}</li>
                    <li><i class="fas fa-flag"></i>${public_repos}</li>
                </ul>
            </div>
    `
    mainEl.appendChild(cardEl)
    
}

formEl.addEventListener('submit',e=>{
    e.preventDefault()
    const inputValue = searchEl.value 
    if(inputValue){
        getUsers(API_URL,inputValue)
        searchEl.value=''; 
    }
})