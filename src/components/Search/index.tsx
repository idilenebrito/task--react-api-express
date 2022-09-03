import styles from "./styles.module.scss";

import { useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const Search = () => {
  const { busca, setBusca } = useContext(TaskContext);
console.log(busca)
  return (
    <div className={styles.containerInputText}>
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
    </div>
  );
};

export default Search;
