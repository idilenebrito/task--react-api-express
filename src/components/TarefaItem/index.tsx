import { IconContext } from "react-icons";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import {
  deleteTask,
  getAllTasks,
  editStatusTask,
} from "../../services/task.service";
import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import { BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";

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

  // const taskChangePriority = async (id: number, status: boolean) => {
  //   await editPrioridadeTask(id, status);
  //   getAllTasksApi();
  // };

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
      <IconContext.Provider value={{ color: "white", size: "38" }}>
       <Link to={`/editar/${item.idTarefas}`}>
        <MdOutlineModeEditOutline
          style={{ marginRight: "20" }}
        />
        </Link>
        <BsTrash
          style={{ marginRight: "20" }}
          onClick={() => removeItem(item.idTarefas)}
        />
      </IconContext.Provider>
    </div>
  );
};
