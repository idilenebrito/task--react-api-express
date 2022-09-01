export type Tarefa = {
    id: number,
    titulo: string,
    descricao?: string,
    prioridade: number,
    dataFim: string,
    status: boolean,
}