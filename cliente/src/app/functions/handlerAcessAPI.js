'use server'

import { cookies } from "next/dist/client/components/headers";

const url = "http://localhost:3000"

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
    const token = cookies().get("token")?.value
    try{ 
        const responseOfApi = await fetch(url + "/usuarios/cadastrar", {
            cache: "no-cache",
            method: 'POST',
            headers: { 'Content-Type': 'Application/json', 
            Cookie: ` token=${token}`},
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
    const token = cookies().get("token")?.value
    const responseOfApi = await fetch(url + "/usuarios/listar", {
        next: {revalidate: 5},
        headers: { 'Content-Type': 'Application/json', 
        Cookie: ` token=${token}`},
    });

    const userAuth = await responseOfApi.json();
    return userAuth;
};



const getUserRegistered = async (user) => {
    
}

export { getUsers, getUserAuthenticated, postUser};