import { ReactComponent as Error } from 'assets/error-icon.svg'
import styles from './ErrorMessage.module.scss'

function ErrorMessage() {
  return (
    <div className={styles.container}>
      <Error/>
      <div className={styles.title}>Oops smth went wrong.</div>
    </div>
  )
}

export default ErrorMessage

