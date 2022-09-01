import { createContext, ReactNode, useState } from 'react';
import { tasksService } from '../services/task.service';
import { Tarefa } from '../types/Task';

type TaskContextProps = {
  children: ReactNode;
};

//Type Props do Context
type TaskContextType = {
  tarefas: Tarefa[];
  isDash: boolean;
  setIsDash: (newState: boolean) => void;
  setTarefas: (newState: Tarefa[]) => void;
  createTask: (data: Tarefa) => void;
  deleteTask: (id: number) => void;
  syncApi: () => void;
};

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType,
);

export const TarefaContextProvider = ({ children }: TaskContextProps) => {
  //Iniciando o array de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isDash, setIsDash] = useState(true);

  const syncApi = async () => {
    const dataApi = await tasksService.getAllTasks();

    //Pega a diferença dos arrays da api e do Context
    let result = tarefas.filter(
      (objContext: Tarefa) =>
        !dataApi.some((objectApi: Tarefa) => objContext.id === objectApi.id),
    );

    //Salva na Api as tarefas que estão só no Context
    result.forEach((task: Tarefa) => {
      tasksService.postTask(task);
    });
  };

  //Função para criar a task e setar no Context
  const createTask = async (data: Tarefa) => {
    const tarefa = {
      id: Math.floor(Math.random() * 65536),
      titulo: data.titulo,
      descricao: data.descricao,
      prioridade: data.prioridade,
      dataFim: data.dataFim,
      status: data.status,
    };

    setTarefas([...tarefas, tarefa]);
  };
  
  //Função para deletar da api e lista
  const deleteTask = async (id: number) => {
    //Recupera as tarefas da api
    const dataApi = await tasksService.getAllTasks();

    //busca pelo id apenas a tarefa clicada para excluir
    const resultSearch = dataApi.filter((item: Tarefa) => item.id === id);

    //verifica se possui uma tarefa na api para excluir da api ou do context
    if (resultSearch.length === 0) {
      const result = tarefas.filter((item) => item.id !== id);
      setTarefas(result);
    } else {
      await tasksService.deleteTask(id);
      const resultRemoved = tarefas.filter((item) => item.id !== id);
      setTarefas(resultRemoved);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tarefas,
        isDash,
        setIsDash,
        setTarefas,
        createTask,
        deleteTask,
        syncApi,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
