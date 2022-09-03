import { useState, ChangeEvent, FormEvent, useEffect, useContext } from "react";
import styles from "./styles.module.scss";
import { postTask } from "../../services/task.service";
import Title from "../Title";
import { TaskContext } from "../../contexts/TaskContext";

// type Props = {
//   valorInicial: any;
// };

export const FormAdd = ({ valorInicial }: any) => {
  //values recebe o valor que o usuario esta digitando e passa ele por props para funçao que esta no app
  const { getAllTasksApi } = useContext(TaskContext);

  const valoresIniciais = valorInicial;
  const [values, setValues] = useState({
    titulo: valoresIniciais?.titulo ?? "",
    descricao: valoresIniciais?.descricao ?? "",
    prioridade: valoresIniciais?.prioridade ?? 5,
    concluido: valoresIniciais?.concluido ?? false,
  });

  const [enableButton, setEnableButton] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postTask({
      titulo: values.titulo,
      descricao: values.descricao,
      prioridade: values.prioridade,
      concluido: values.concluido,
    });

    setValues({
      // no final da submissao ele vai limpar o formulario
      titulo: "",
      descricao: "",
      prioridade: 5,
      concluido: false,
    });
    getAllTasksApi();
  };

  const validation = () => {
    if (values.titulo.length) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  };

  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.titulo]);

  return (
    <div>
      {valoresIniciais?.idTarefas ? (
        <Title name="Editar Tarefa" />
      ) : (
        <Title name="Cadastrar Tarefa" />
      )}
      <div className={styles.container}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.containerInputText}>
            <input
              className={styles.inputText}
              type="text"
              name="titulo"
              placeholder="Título da tarefa"
              value={values.titulo}
              onChange={(e) => handleChange(e)}
              disabled={valoresIniciais?.idTarefas}
            />
            <input
              className={styles.inputText}
              type="text"
              name="descricao"
              placeholder="Descrição da tarefa"
              value={values.descricao}
              onChange={(e) => handleChange(e)}
              disabled={valoresIniciais?.idTarefas}
            />
          </div>
          <div className={styles.flexBox}>
            <select
              className={styles.select}
              name="prioridade"
              value={values.prioridade}
              onChange={(e) => handleChangeSelect(e)}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>
          <button
            disabled={enableButton}
            type="submit"
            className={styles.buttonSubmit}
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};
