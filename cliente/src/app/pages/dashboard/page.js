import { getUsers } from "@/app/functions/handlerAcessAPI";
import Link from 'next/link';
import styles from '../../../page.module.css';

export default async function Dashboard() {

    const chama = await getUsers(); //criando uma const e chamando a function "getUsers()" lá do "handleAcessAPI"

    return (
        <body className={styles.body}>
            <div class={styles.div}>
                <div className={styles.tudin}>
                    <h1 className={styles.h1}>Dashboard</h1>

                    <div className={styles.manos}>  
                        {chama.map((users) => //mapeando o "banco de dados" e chamando apenas o nome do usuário 
                            <p className={styles.usuario}>Nome ➡ {users.name}</p>
                        )}
                    </div>
                    <h3 className={styles.h3}>Não tem uma conta? Crie uma na <Link className={styles.link} href='/pages/register'>página de registro</Link></h3>
                </div>
            </div>
        </body>
    );
};