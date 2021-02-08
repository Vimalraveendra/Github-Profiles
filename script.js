const API_URL =`https://api.github.com/users/`

async function getUsers(url){
   const resp = await fetch(url+"vimalKumar");
   const userData = resp.json()
   console.log("user",userData)
}

getUsers(API_URL)