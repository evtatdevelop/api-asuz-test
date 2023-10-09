import classes from './error.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Error = () => <section className={classes.error}>

  <div>
    <FontAwesomeIcon icon={faExclamationCircle} className={classes.sign}/>
    <h1>Что-то пошло не так</h1>
    <p>Попробуйте повторно выполнить действие через некоторое время. В случае, если ошибка сохраняется - обратить в Центр поддержки пользователей.</p>
    <p>Please try again after a while. If the error persists, contact the User Support Center.</p>
  </div>

</section>

export default Error;