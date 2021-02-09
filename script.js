const API_URL ='https://api.github.com/users/'

const formEl = document.getElementById('form')
const mainEl = document.getElementById('main')
const searchEl=document.getElementById('search')

async function getUsers(url,userName){
try{
    const resp = await fetch(url+userName);
    const userData = await resp.json()
    console.log(userData)
    if(userData.message!=='Not Found'){
    createGitProfile(userData)
    getRepos(url,userName)
    }else{
        console.log("User not found")
    }
    
}catch(error){
    console.log(error)
}
}

getUsers(API_URL,"John")


// get git user Repos

async function getRepos(url,userName){
    try{
        const resp = await fetch(url+userName +'/repos');
        const userRepos = await resp.json()
         addReposToProfile(userRepos)    
    }catch(error){
        console.log(error)
    }
   
}

// add repos list to profile
function addReposToProfile(repos){
 const reposEl = document.getElementById('repos')
  repos.slice(0,5).forEach(repo=>{
      const repoEl = document.createElement('a')
       repoEl.classList.add('repo')
       repoEl.href=repo.html_url
       repoEl.target="_blank"
       repoEl.innerText= repo.name;
      reposEl.appendChild(repoEl)
  })
}

// create new github profile
function createGitProfile(user){
    const {avatar_url,name,followers, following,public_repos,bio,login}= user
    // clear the container
    mainEl.innerHTML = '';
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')
    cardEl.innerHTML=`
            <div class="img-container">
            <img src= "${avatar_url}" class="img" alt="">
            </div>
            <div class='user-info'>
                <h2>${name?`${name}`:`${login}`}</h2>
                <p>${bio}</p>
                <ul class='list'>
                    <li><i class="fas fa-eye"></i>${followers}</li>
                    <li><i class="fas fa-heart"></i>${following}</li>
                    <li><i class="fas fa-flag"></i>${public_repos}</li>
                </ul>
                <h4>Repos:</h4>
                <div class="repos" id="repos">
                </div>
            </div>
            
            
    `
    mainEl.appendChild(cardEl)
    
}

// whenever user enter the inputfield with value and press enter
formEl.addEventListener('submit',e=>{
    e.preventDefault()
    const inputValue = searchEl.value 
    // if there is input value, get the github user
    if(inputValue){
        getUsers(API_URL,inputValue)
        searchEl.value=''; 
    }
})