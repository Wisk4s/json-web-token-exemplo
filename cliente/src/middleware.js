'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";

export const middleware = async (request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const urlDashBoard = new URL ('/pages/dashboard', request.url) //"criação" da URL para o redirecionamento do usuário 
    const isTokenValidated = await validateToken(token); //deixando a função assíncrona 


    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        }
        
    }

    if (isTokenValidated || token) { //fazendo a validação do token do usuário logado
        if (request.nextUrl.pathname === '/') { //verifica se o usuário que possui o token está na página padrão
            return NextResponse.redirect(urlDashBoard); //redirecionando o usuário da página de "login" para a página de "dashboard"
        }
    }

    if (!isTokenValidated || !token) { //fazendo a validação se o usuário não possui o token -> última  requisição do trabalho
        if (request.nextUrl.pathname === '/pages/register') { //verifica se o usuário está na página de "registro" ou na página "alter" -> última  requisição do trabalho
            return NextResponse.redirect(urlLogin); //redirecionando o usuário da página de "registro" para a página de "dashboard" -> última  requisição do trabalho
    }
}

    if (!isTokenValidated || !token) { //fazendo a validação se o usuário não possui o token -> última  requisição do trabalho
        if (request.nextUrl.pathname === '/pages/alter') { //verifica se o usuário está na página de "registro" ou na página "alter" -> última  requisição do trabalho
            return NextResponse.redirect(urlLogin); //redirecionando o usuário da página de "registro" para a página de "dashboard" -> última  requisição do trabalho
    }
}

    NextResponse.next();
};



export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/register', '/pages/alter']
};

