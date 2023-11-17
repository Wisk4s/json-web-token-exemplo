'use server'

const url = "https://aula-17-10-ashen.vercel.app"

/*const users = [
    {
        "name": "marcelino",
        "email": "joao.santos@gmail.com",
        "password": "123",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    },
    {
        "name": "victor",
        "email": "vito@gmail.com",
        "password": "123",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    },
    {
        "name": "jose",
        "email": "jose@hotmail.com",
        "password": "123",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    },
    {
        "name": "caio",
        "email": "caio@yahoo.com",
        "password": "123",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
]*/

const getUserAuthenticated = async (user) => {

    const responseOfApi = await fetch(url + "/user/authenticated",
        {
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(user)
        }
    );

    const userAuth = await responseOfApi.json();
    return userAuth;
}   
    /*let userAuth = {} //armazena o userr (usuário) ou seja, o que está armazenado dentro da userAuth
    
    users.map(userr => {
        if(user.email == userr.email && user.password == userr.password){ //verificando se o email do usuário é igual o email de login do usuario
            userAuth = userr 
            
        }
    });
    console.log(userAuth);
    return userAuth*/
//}
const postUser = async (user) => {
    try{
        const responseOfApi = await fetch(url + "/user", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(user)
        });
        const userSave = await responseOfApi.json();
        return userSave;
    }catch{
        return null;
    }
}

const getUsers = async () =>{
    const osManos = await fetch(url + "/users",
    {
        next: {revalidate: 10},
    }
);

const userAuth = await osManos.json();
return userAuth;
}

const getUserRegistered = (user) => {
    
    /*let newUserAuth = {} //armazena o userr (usuário) ou seja, o que está armazenado dentro da userAuth
    
    users.map(userr => {
        if(user.name == userr.name && user.email == userr.email && user.password == userr.password){ //verificando se o email do usuário é igual o email de login do usuario
            newUserAuth = userr 
            
        }
    });
    console.log(newUserAuth);
    return newUserAuth*/
}

export { getUsers, getUserAuthenticated, getUserRegistered};