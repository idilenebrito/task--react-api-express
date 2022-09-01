/* eslint-disable react-hooks/exhaustive-deps */
import { useContext,  } from "react";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { FormAdd } from "./components/FormAdd";
import { Header } from "./components/Header";
import { TarefaItem } from "./components/TarefaItem";
import { TaskContext } from "./contexts/TaskContext";

const App = () => {
  const { tarefas, isDash } = useContext(TaskContext);

  return (
    <div className="container">
      <Header />
      {isDash ? (
        <div className="central-area">
          <Dashboard />
          {tarefas
            .sort((a, b) => a.prioridade - b.prioridade)
            .map((item, index) => (
              <TarefaItem key={index} item={item} />
            ))}
        </div>
      ) : (
        <div className="central-area">
          <FormAdd />
        </div>
      )}
    </div>
  );
};

export default App;
