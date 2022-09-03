import styles from './styles.module.scss';

const Title = ({name}: any) => {
  return (
    <>
      <div className={styles.pageTitle}>
        <h1 className={styles.title}>{name}</h1>
      </div>
    </>
  );
};

export default Title;
