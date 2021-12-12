import { useState, useEffect } from 'react';
import styles from './Counter.module.scss';
import classNames from 'classnames';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 1000);
  }

  return (
    <div className="is-flex is-flex-direction-column">
      <p>You clicked {count} times</p>
      <button
        className={classNames(styles.counter, 'button is-primary')}
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
}
