import styles from './index.module.scss';

interface INotification {
  type: 'warning' | 'success' | 'error';
  message: string;
}

function Index({ type, message }: INotification) {
  if (typeof message === 'string') {
    return (
      <div className={`${styles.notification} ${styles[type]}`}>
        <p>{message}</p>
      </div>
    );
  }
}

export default Index;
