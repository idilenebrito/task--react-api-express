import { Tarefa } from '../types/Task';
import Api from './api';

export const getAllTasks = async () => {
  try {
    const tasks = await Api.get(`/tasks`);
    return tasks.data;
  } catch (err) {
    throw err;
  }
};
export const postTask = async (bodyTask: Tarefa) => {
  try {
    const result = await Api.post(`/tasks`, bodyTask);
    return result;
  } catch (err) {
    throw err;
  }
};
export const deleteTask = async (id: number) => {
  try {
    const result = await Api.delete(`/tasks/${id}`);
    return result;
  } catch (err) {
    throw err;
  }
};
export const editTask = async (id: number, bodyTask: Tarefa) => {
  try {
    const result = await Api.put(`/tasks/${id}`, bodyTask);
    return result;
  } catch (err) {
    throw err;
  }
};

export const tasksService = {
  getAllTasks,
  postTask,
  deleteTask,
  editTask,
};
