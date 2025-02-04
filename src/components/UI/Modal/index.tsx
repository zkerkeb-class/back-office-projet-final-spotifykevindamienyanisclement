import styles from './index.module.scss';

interface IModal {
  children: React.ReactNode;
  title: string;
  closeModal: () => void;
  isOpen: boolean;
}

function Index({ children, title, closeModal, isOpen }: IModal) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal();
    }
  };

  return (
    isOpen && (
      <>
        <div
          className={styles.overlay}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          role="button"
          aria-label="modal"
          tabIndex={0}
        />
        <div className={styles.modal}>
          <div className={styles.header}>
            <h2>{title}</h2>
            <button onClick={closeModal} type="button" aria-label="Close modal">
              <span className={styles.srOnly}>Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3 54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </>
    )
  );
}

export default Index;
