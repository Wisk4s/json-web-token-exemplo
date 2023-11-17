'use client'
import { useState } from "react";
import handlerAcessUser from "../../functions/handlerAcess"
import { useRouter } from "next/navigation";
import styles from '../../../page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Alterar() {
  const [altera, setAltera] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { push, refresh } = useRouter();

  const handlerAlterar = async (e) => {

    e.preventDefault();
    try {
      await handlerAcessUser(user);
      push('/pages/alterar');
    } catch {
      refresh();
    }

    const success = true;

    if (success) {
      toast.success('Usuário alterado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao enviar o formulário.');
    }
  };
  return (
    <body className={styles.body}>
      <div className={styles.div}>
        <h1 className={styles.h1}>Alterar</h1>
        <form className={styles.form} onSubmit={handlerAlterar}>
          <input
            required
            className={styles.input}
            placeholder='Nome'
            type="name"
            onChange={(e) => { setAltera({ ...altera, name: e.target.value }) }}>
          </input>

          <input
            required
            className={styles.input}
            placeholder='E-mail'
            type="email"
            onChange={(e) => { setAltera({ ...altera, email: e.target.value }) }}>
          </input>

          <input
            required
            className={styles.input}
            placeholder='Senha'
            type='password'
            onChange={(e) => { setAltera({ ...altera, password: e.target.value }) }}>
          </input>
          <button className={styles.button}>Atualizar</button>
        </form>
        <h3 className={styles.h3}><Link className={styles.link} href='/pages/dashboard'>Clique aqui</Link> para retornar a página de Dashboard</h3>
        <h3 className={styles.h3}>Não tem uma conta? Vá para a <Link className={styles.link} href='/pages/register'>página de registro</Link></h3>
        <ToastContainer />
      </div>
    </body>
  )
}
