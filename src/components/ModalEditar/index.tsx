import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskId } from "../../services/task.service";
import { AxiosResponse } from "axios";
import { FormAdd } from "../FormAdd";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const ModalEditar = () => {
  const { id } = useParams();
  const [valorInicial, setValorInicial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTaskId(parseInt(id!, 0)).then((response: AxiosResponse) =>
      setValorInicial(response.data)
    );
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lista de Tarefas</h1>
        <button onClick={() => navigate("/")}>{"Dashboard"}</button>
      </div>
      <div className={styles.centralArea}>
        {!!valorInicial && <FormAdd valorInicial={valorInicial} />}
      </div>
    </div>
  );
};

export default ModalEditar;
