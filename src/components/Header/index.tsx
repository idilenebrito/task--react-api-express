import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import styles from "./styles.module.scss";

export const Header = () => {
  const { isDash, setIsDash, syncApi } = useContext(TaskContext);
  return (
    <div className={styles.header}>
      <h1>Lista de Tarefas</h1>
      <button onClick={() => syncApi()}>
        {!isDash ? "🔃 Sincronizar" : ""}
      </button>
      <button onClick={() => setIsDash(!isDash)}>
        {isDash ? "+ Nova Tarefa" : "Dashboard"}
      </button>
    </div>
  );
};
