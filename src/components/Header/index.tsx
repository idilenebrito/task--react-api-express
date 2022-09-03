import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
// import Search from "../Search";
import styles from "./styles.module.scss";

export const Header = () => {
  const { isDash, setIsDash } = useContext(TaskContext);


  return (
    <div className={styles.header}>
      <h1>Lista de Tarefas</h1>
      {/* <Search/> */}
      <button onClick={() => setIsDash(!isDash)}>
        {isDash ? "+ Nova Tarefa" : "Dashboard"}
      </button>
    </div>
  );
};
