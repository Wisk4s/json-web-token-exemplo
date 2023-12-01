//import { jwtVerify } from "jose";
import { decode } from "jsonwebtoken";
const validateToken = async (token)=>{
    //const meuToken = "UAHSD8O71YG87FGHQ8970FG10872GR08712FR78";

    try {
        const isTokenValid = await decode(token);

        if(isTokenValid){
            return true;
        }
    } catch {
        return false
    }
}   
export {validateToken};

/*
const isTokenValidate = await jwtVerify (token, new TextEncoder().encode(meuToken)) //criando uma verificação para ver se o token do mano foi criado com o meu secret criado na vercel
        if (isTokenValidate) {
            return true;
        }*/

/*return false;*/