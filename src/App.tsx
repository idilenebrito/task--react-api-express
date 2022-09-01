/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { FormAdd } from './components/FormAdd';
import { Header } from './components/Header';
import { TarefaItem } from './components/TarefaItem';
import { TaskContext } from './contexts/TaskContext';
import { tasksService } from './services/task.service';
import { Tarefa } from './types/Task';

const App = () => {
  const { createTask, tarefas, isDash, setTarefas, deleteTask } =
    useContext(TaskContext);

  const addTarefa = (novaTarefa: Tarefa) => {
    createTask({
      id: novaTarefa.id,
      titulo: novaTarefa.titulo,
      descricao: novaTarefa.descricao,
      prioridade: novaTarefa.prioridade,
      dataFim: novaTarefa.dataFim,
      status: false,
    });
  };
  //Recupera todas as terefas da api e salva no contexto
  const getAllTasksApi = async () => {
    const dataApi = await tasksService.getAllTasks();

    setTarefas(dataApi);
  };

  //Função que muda o status da tarefa
  const taskChange = async (id: number, status: boolean) => {
    let novaLista = [...tarefas];

    const dataApi = await tasksService.getAllTasks();
    const resultSearch = dataApi.filter((item: Tarefa) => item.id === id);

    //verifica se possui uma tarefa na api para mudar o status no item da api ou do context
    if (resultSearch.length === 0) {
      for (let i in novaLista) {
        if (novaLista[i].id === id) {
          novaLista[i].status = status;
        }
      }
      setTarefas(novaLista);
    } else {
      const bodyTask = dataApi.filter((item: Tarefa) => item.id === id);

      const newState = novaLista.map((obj: Tarefa) => {
        if (obj.id === id) {
          bodyTask[0].status = status;
          return { ...obj, status: status };
        }

        return obj;
      });

      setTarefas(newState);
      await tasksService.editTask(id, bodyTask[0]);
    }
  };

  const removeItem = (id: number) => {
    deleteTask(id);
  };

  useEffect(() => {
    //Salva dos dados da api no contexto ao carregar a aplicação
    getAllTasksApi();
  }, []);

  return (
    <div className="container">
      <Header />
      {isDash ? (
        <Dashboard />
      ) : (
        <div className="central-area">
          <FormAdd addTarefa={addTarefa} />

          {tarefas
            .sort((a, b) => a.prioridade - b.prioridade)
            .map((item, index) => (
              <TarefaItem
                key={index}
                item={item}
                onChange={taskChange}
                removeItem={removeItem}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
