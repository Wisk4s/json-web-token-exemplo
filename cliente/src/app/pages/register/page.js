'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../../../page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { postUser } from "@/app/functions/handlerAcessAPI";

export default function Registro() {
  const [registra, setRegistra] = useState({
    nome: '',
    senha: '',
    csenha: ''
  });
  const { push, refresh } = useRouter();

  

  const handlerRegistro = async (e) => {
    e.preventDefault();
    
    if(registra.senha != registra.csenha){
      return toast.error('As senhas são diferentes.')
    }
    
    try {
      await postUser(registra);
      toast.success('Usuário registrado com sucesso!');
      push('/pages/dashboard');
    } catch (err) {
      toast.error('Ocorreu um erro ao enviar o formulário.');
      console.log(err)
    }
  };

  return (
    <body className={styles.body}>
      <div class={styles.div}>
        <h1 className={styles.h1}>Registre-se</h1>
        <form className={styles.form} onSubmit={handlerRegistro}>
          <input
            required
            className={styles.input}
            name="nome"
            placeholder='Nome'
            type="name"
            onChange={(e) => { setRegistra({ ...registra, nome: e.target.value }) }}>
          </input>

          <input
            required
            className={styles.input}
            name="senha"
            placeholder='Senha'
            type='password'
            onChange={(e) => { setRegistra({ ...registra, senha: e.target.value }) }}>
          </input>

          <input
            required
            name="csenha"
            className={styles.input}
            placeholder='Confirme sua senha'
            type='password'
            onChange={(e) => { setRegistra({ ...registra, csenha: e.target.value }) }}>
          </input>
          <button className={styles.button}>Entrar</button>
        </form>
        <h3 className={styles.h3}><Link className={styles.link} href='/pages/dashboard'>Clique aqui</Link> para retornar a página de Dashboard</h3>
        <ToastContainer />
      </div>
    </body>
  )
}
