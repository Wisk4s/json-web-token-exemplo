'use server'

const url = "https://aula-17-10-ashen.vercel.app"

const getUserAuthenticated = async (user) => {

try{
    const responseOfApi = await fetch(url + "/user/authenticated",
        {
            cache: "no-cache",
            method: "POST",
            headers: {"Content-type": "Application/json"},
            body: JSON.stringify(user)
        }
    );

    const userAuth = await responseOfApi.json();
    return userAuth;
}catch {
    return {};
}
}  

const postUser = async (user) => {
    console.log(JSON.stringify(user))
    try{ 
        const responseOfApi = await fetch(url + "/user", {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(user)
        });
        const userSave = await responseOfApi.json();
        console.log(userSave)
        return userSave;
    }catch (err){
        console.log("error:" +err)
        return null;
    }
}

const getUsers = async () =>{
    const osManos = await fetch(url + "/users", {
        next: {revalidate: 5},
    });

    const userAuth = await osManos.json();
    return userAuth;
};



const getUserRegistered = async (user) => {
    
}

export { getUsers, getUserAuthenticated, postUser};