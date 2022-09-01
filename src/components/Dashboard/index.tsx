/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import styles from './styles.module.scss';

export const Dashboard = () => {
  const { tarefas } = useContext(TaskContext);

  //Função que filtra apenas as tarefas concluídas
  const countTasksDone = () => {
    const taksDone = tarefas.filter((item) => item.concluido === true);
    return taksDone;
  };

   //Função que filtra apenas as tarefas pendentes
   const countTaksPending = () => {
    const taksDone = tarefas.filter((item) => item.concluido === false);
    return taksDone;
  };

  useEffect(() => {
    countTaksPending();
    countTasksDone();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.box}>
          <h2>Tarefas concluídas</h2>
          <h1>{countTasksDone().length}</h1>
        </div>
        <div className={styles.box}>
          <h2>Tarefas Pendentes em dia</h2>
          <h1>{countTaksPending().length}</h1>
        </div>
      </div>
    </div>
  );
};