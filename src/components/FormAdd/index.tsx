import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Tarefa } from '../../types/Task';
import styles from './styles.module.scss';

type Props = {
  addTarefa: (novaTarefa: Tarefa) => void;
};

export const FormAdd = ({ addTarefa }: Props) => {
  //values recebe o valor que o usuario esta digitando e passa ele por props para funçao que esta no app
  const [values, setValues] = useState({
    id: Math.floor(Math.random() * 65536),
    titulo: '',
    descricao: '',
    prioridade: 1,
    dataFim: '',
    status: true,
  });
  const [enableButton, setEnableButton] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addTarefa(values);
    setValues({ // no final da submissao ele vai limpar o formulario
      id: Math.floor(Math.random() * 65536),
      titulo: '',
      descricao: '',
      prioridade: 1,
      dataFim: '',
      status: true,
    });
  };

  const validation = () => {
    if (values.titulo.length > 0 && values.dataFim.length > 0) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  };

  useEffect(() => {
    validation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.titulo, values.dataFim]);

  return (
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
          />
          <input
            className={styles.inputText}
            type="text"
            name="descricao"
            placeholder="Descrição da tarefa"
            value={values.descricao}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.flexBox}>
          <select
            className={styles.select}
            name="prioridade"
            value={values.prioridade}
            onChange={(e) => handleChangeSelect(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            className={styles.inputDate}
            value={values.dataFim}
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            name="dataFim"
            placeholder="Descrição da tarefa"
            onChange={(e) => handleChange(e)}
          />
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
  );
};
