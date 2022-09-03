import { Tarefa } from '../types/Task';
import Api from './api';

export const getAllTasks = async () => {
  try {
    const tasks = await Api.get<Tarefa[]>(`/tarefas`);
    return tasks.data;
  } catch (err) {
    throw err;
  }
};

export const getTaskId = async (id: number) => {
  try {
    const tasksId = await Api.get<Tarefa[]>(`/tarefas/${id}`);
    return tasksId;
  } catch (err) {
    throw err;
  }
}

export const postTask = async (bodyTask: Tarefa) => {
  try {
    const result = await Api.post(`/tarefas`, bodyTask);
    return result;
  } catch (err) {
    throw err;
  }
};
export const deleteTask = async (id: number) => {
  try {
    const result = await Api.delete(`/tarefas/${id}`);
    return result;
  } catch (err) {
    throw err;
  }
};
export const editStatusTask = async (id: number, status: boolean) => {
  try {
    const result = await Api.put(`/tarefas/status/${id}`, { concluido: status }); //!
    return result;
  } catch (err) {
    throw err;
  }
};

export const editPrioridadeTask = async (id: number, status: boolean) => {
  try {
    const result = await Api.put(`/tarefas/prioridade/${id}`, { prioridade: status });
    return result;
  } catch (err) {
    throw err;
  }
};

export const tasksService = {
  getAllTasks,
  postTask,
  deleteTask,
  editPrioridadeTask,
  editStatusTask
};
