import React from 'react';

import styles from './homeComponent.module.scss';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.home_wrapper}>
        <h1 className={styles.home_title}>Welcome to the Snake Game</h1>
        <p className={styles.home_subtitle}>Slither into Fun!</p>
        <p className={styles.home_text}>
          Are you ready to relive the classic fun of the Snake game? <br />
          Whether you're a seasoned player or a newcomer, our game offers an exciting experience that will keep you
          entertained for hours.
          <br />
          Control the snake, eat the apples, and grow as long as you can without hitting the walls or yourself!
        </p>
        <p className={styles.home_subtitle}>How to Play</p>
        <ul>
          <li>
            <span>Start the Game:</span> Click the "Start Game" button to begin.
          </li>
          <li>
            <span>Eat the Apples:</span> Guide your snake to the apples to grow longer.
          </li>
          <li>
            <span>Control the Snake:</span> Use the arrow keys on your keyboard to move the snake.
          </li>
          <li>
            <span>Avoid Collisions:</span> Don’t hit the walls or the snake's own body.
          </li>
        </ul>
        <p className={styles.home_subtitle}>Are you ready to play? Click the button below to start!</p>
        <Link to='/game' className={styles.start_button}>
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;
