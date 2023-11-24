'use client'
import Link from 'next/link';
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import styles from '../page.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: ''
  });

  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {

    e.preventDefault();
    try {
      await handlerAcessUser(user);
      push('/pages/dashboard');
    } catch {
      refresh();
    }

    const success = true;

    if (success) {
      toast.success('Formulário enviado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao enviar o formulário.');
    }
  };

  return (
    <body className={styles.body}>
      <div className={styles.tudo}>
        <h1 className={styles.h1}>Login</h1>
        <form className={styles.form} onSubmit={handlerLogin}>
          <input
            required
            className={styles.input}
            placeholder='Nome'
            type="text"
            onChange={(e) => { setUser({ ...user, name: e.target.value }) }}>
          </input>
          <input
            required
            className={styles.input}
            placeholder='Senha'
            type='password'
            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}>
          </input>
          <button className={styles.button}>Entrar</button>
        </form>
        <h3 className={styles.h3}>Deseja alterar algum dado? <Link className={styles.link} href="/pages/alter">Clique aqui</Link></h3>
        <h3 className={styles.h3}>Não tem uma conta? Vá para a <Link className={styles.link} href='/pages/register'>página de registro</Link></h3>
        <ToastContainer />
      </div>
    </body>
  )
}

