const API_URL =`https://api.github.com/users/`

const formEl = document.getElementById('form')
const mainEl = document.getElementById('main')
const searchEL=document.getElementById('search')

async function getUsers(url){
   const resp = await fetch(url+"Christopher James");
   const userData = resp.json()
   console.log("user",userData)
}

getUsers(API_URL)