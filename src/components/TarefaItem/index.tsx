import { Tarefa } from '../../types/Task';
import styles from './styles.module.scss';

type Props = {
  item: Tarefa;
  onChange: (id: number, status: boolean) => void;
  removeItem: (id: number) => void;
};
//Card individual que exibe as informações da tarefa
export const TarefaItem = ({ item, onChange, removeItem }: Props) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: item.status ? '#353e2c' : '#20212c',
      }}
    >
      <div className={styles.cardLeft}>
        <input
          type="checkbox"
          checked={item.status}
          onChange={(e) => onChange(item.id, e.target.checked)}
        />
        <div className={styles.infor}>
          <label
            style={{
              textDecoration: item.status ? 'line-through' : 'initial',
            }}
            className={styles.labelBigger}
          >
            {item.titulo}
          </label>

          <label className={styles.labelSmall}>{item.descricao}</label>
        </div>
        <div className={styles.infor}>
          <label className={styles.labelBigger}>
            Prioridade: {item.prioridade}
          </label>

          <label className={styles.labelSmall}>{item.dataFim}</label>
        </div>
      </div>

      <span onClick={() => removeItem(item.id)}>X</span>
    </div>
  );
};
