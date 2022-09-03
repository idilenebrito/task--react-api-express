import { createContext, ReactNode, useState, useEffect } from "react";
import { Tarefa } from "../types/Task";
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
  getAllTasksApi: () => void;
  busca: string;
  setBusca: (busca: string) => void;

};

export const TaskContext = createContext<TaskContextType>(
  {} as TaskContextType
);

export const TarefaContextProvider = ({ children }: TaskContextProps) => {
  //Iniciando o array de tarefas
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isDash, setIsDash] = useState(true);
  const [busca, setBusca] = useState("");

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
        busca,
        isDash,
        setIsDash,
        setTarefas,
        getAllTasksApi,
        setBusca
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
