/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import styles from './styles.module.scss';

export const Dashboard = () => {
  const { tarefas } = useContext(TaskContext);

  //Função que filtra apenas as tarefas concluídas
  const countTasksDone = () => {
    const taksDone = tarefas.filter((item) => item.status === true);
    return taksDone;
  };

  //Função que pega a data atual e formata
  const getDateCurrent = () => {
    let dateCurrent = new Date();
    let day = dateCurrent.getDate();
    let month = dateCurrent.getMonth() + 1;
    let year = dateCurrent.getFullYear();

    const dateCurrentFinal = `${year}${'-'}${
      month < 10 ? `0${month}` : `${month}`
    }${'-'}${day}`;

    return dateCurrentFinal;
  };

  //Função que filtra as tarefas pendentes em dia e não concluídas
  const countTaksPeding = () => {
    const taksPending = tarefas.filter(
      (item) => item.dataFim >= getDateCurrent() && !item.status,
    );

    return taksPending;
  };

  //Função que filtra as tarefas pendentes atrasadas e não concluídas
  const countTaksPedingLate = () => {
    const taksPending = tarefas.filter(
      (item) => item.dataFim < getDateCurrent() && !item.status,
    );

    return taksPending;
  };

  useEffect(() => {
    countTaksPeding();
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
          <h1>{countTaksPeding().length}</h1>
        </div>
        <div className={styles.box}>
          <h2>Card Pendentes atrasadas</h2>
          <h1>{countTaksPedingLate().length}</h1>
        </div>
      </div>
    </div>
  );
};