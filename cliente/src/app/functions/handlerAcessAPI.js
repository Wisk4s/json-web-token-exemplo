'use server'

const url = "localhost:4000" //https://aula-17-10-ashen.vercel.app

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

}

export { getUsers, getUserAuthenticated, getUserRegistered, postUser};