import { Tarefa } from "../../types/Task";
import { FormEvent, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  deleteTask,
  getAllTasks,
  editStatusTask,
} from "../../services/task.service";
import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

type Props = {
  item: any;
};
//Card individual que exibe as informações da tarefa
export const TarefaItem = ({ item }: Props) => {
  const { tarefas, getAllTasksApi } = useContext(TaskContext);

  const removeItem = async (id: number) => {
    await deleteTask(id);
    getAllTasksApi();

  };

  //Função que muda o status da tarefa
  const taskChange = async (id: number, status: boolean) => {
    await editStatusTask(id, status);
    getAllTasksApi();
  };

  useEffect(() => {
    getAllTasks();
  }, [tarefas]);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: item.concluido ? "#2B9393" : "#C86B35",
      }}
    >
      <div className={styles.cardLeft}>
        <input
          type="checkbox"
          checked={item.concluido}
          onChange={(e) => taskChange(item.idTarefas, e.target.checked)}
        />
        <div className={styles.infor}>
          <label
            style={{
              textDecoration: item.concluido ? "line-through" : "initial",
            }}
            className={styles.labelBigger}
          >
            {item.titulo}
          </label>

          <label className={styles.labelSmall}>{item.descricao}</label>
        </div>
        <div className={styles.infor}>
          <label className={styles.labelBigger}>
            Prioridade: {item.prioridade}
          </label>
        </div>
      </div>

      <span onClick={() => removeItem(item.idTarefas)}>X</span>
    </div>
  );
};
