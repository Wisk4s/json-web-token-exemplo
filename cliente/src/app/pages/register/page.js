'use client'
import { useState } from "react";
import handlerAcessUser from "../../functions/handlerAcess"
import { useRouter } from "next/navigation";
import styles from '../../../page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import {postUser} from '@/app/functions/handlerAcessAPI';

export default function Registro() {
  const [registra, setRegistra] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { push, refresh } = useRouter();

  const handlerRegistro = async (e) => {
    e.preventDefault();
    try {
      await handlerAcessUser(user);
      push('/pages/register');
    } catch {
      refresh();
    }

    const success = true;

    if (success) {
      toast.success('Usuário registrado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao enviar o formulário.');
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
            placeholder='Nome'
            type="name"
            onChange={(e) => { setRegistra({ ...registra, name: e.target.value }) }}>
          </input>

          <input
            required
            className={styles.input}
            placeholder='E-mail'
            type="email"
            onChange={(e) => { setRegistra({ ...registra, email: e.target.value }) }}>
          </input>

          <input
            required
            className={styles.input}
            placeholder='Senha'
            type='password'
            onChange={(e) => { setRegistra({ ...registra, password: e.target.value }) }}>
          </input>
          <button className={styles.button}>Entrar</button>
        </form>
        <h3 className={styles.h3}><Link className={styles.link} href='/pages/dashboard'>Clique aqui</Link> para retornar a página de Dashboard</h3>
        <h3 className={styles.h3}>Deseja alterar algum dado? <Link className={styles.link} href="/pages/alter">Clique aqui</Link></h3>
        <ToastContainer />
      </div>
    </body>
  )
}
