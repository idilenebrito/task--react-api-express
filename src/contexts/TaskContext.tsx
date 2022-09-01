import { createContext, ReactNode, useState, useEffect } from 'react';
import { Tarefa } from '../types/Task';
import { tasksService } from "../services/task.service";


type TaskContextProps = {
  children: ReactNode;
};

//Type Props do Context
type TaskContextType = {
  tarefas: Tarefa[];
  isDash: boolean;
  setIsDash: (newState: boolean) => void;
  setTarefas: (newState: Tarefa[]) => void;
  getAllTasksApi: () => void
};

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType,
);

export const TarefaContextProvider = ({ children }: TaskContextProps) => {
  //Iniciando o array de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isDash, setIsDash] = useState(true);

  //Recupera todas as terefas da api e salva no contexto
  const getAllTasksApi = async () => {
    const dataApi = await tasksService.getAllTasks();

    setTarefas(dataApi);
  };

  useEffect(() => {
    //Salva dos dados da api no contexto ao carregar a aplicação
    getAllTasksApi();
  }, []);
  
  return (
    <TaskContext.Provider
      value={{
        tarefas,
        isDash,
        setIsDash,
        setTarefas,
        getAllTasksApi
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
