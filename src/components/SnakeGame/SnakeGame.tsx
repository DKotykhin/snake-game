import React, { useState, useEffect, useRef } from 'react';

import { feedValue } from './feedValue';
import styles from './snakeGame.module.scss';

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15, value: 1 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [speed, setSpeed] = useState(500);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [pause, setPause] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;
    if (speed === 200) return;
    if (snake.length <= 50) return;
    if (snake.length > 50 && snake.length <= 100 && speed === 500) {
      setSpeed(400);
    } else if (snake.length > 100 && snake.length <= 150 && speed === 400) {
      setSpeed(300);
    } else if (snake.length > 150 && speed === 300) {
      setSpeed(200);
    }
  }, [gameOver, snake, speed]);

  useEffect(() => {
    const handleKeydown = (e: { key: string }) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = setInterval(() => {
      if (pause) return;
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 ||
          head.x >= 25 ||
          head.y < 0 ||
          head.y >= 25 ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          bestScore < snake.length - 1 && setBestScore(snake.length - 1);
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25), value: feedValue() });

          // const newHead1 = { ...head, x: head.x + direction.x, y: head.y + direction.y };
          // newSnake.unshift(newHead1);

          // const newHead2 = { ...head, x: newHead1.x + direction.x, y: newHead1.y + direction.y };
          // newSnake.unshift(newHead2);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(moveSnake);
  }, [snake, direction, food, speed, gameOver, bestScore, pause]);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (food.value === 5) {
      context.fillStyle = '#cbb102';
      context.strokeStyle = '#7b5e00';
    } else if (food.value === 10) {
      context.fillStyle = '#000';
      context.strokeStyle = '#7b5e00';
    } else {
      context.fillStyle = '#f15922';
      context.strokeStyle = '#8b0000';
    }
    context.beginPath();
    context.arc(food.x * 20 + 10, food.y * 20 + 10, 10, 0, 2 * Math.PI);
    context.fill();
    context.lineWidth = 1;
    context.stroke();
    context.fillStyle = '#fff';
    context.font = 'bold 14px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(`${food.value}`, food.x * 20 + 10, food.y * 20 + 11);

    context.fillStyle = '#00a1b6';
    snake.forEach((segment, index) => {
      context.beginPath();
      context.arc(segment.x * 20 + 10, segment.y * 20 + 10, 10, 0, 2 * Math.PI);
      context.fill();
      if (index === 0) {
        context.strokeStyle = '#004e58';
        context.lineWidth = 2;
        context.stroke();
      }
    });
  }, [snake, food]);

  return (
    <div className={styles.snake_wrapper}>
      <h1 className={styles.title}>Snake Game</h1>
      <canvas ref={canvasRef} width='500' height='500' className={styles.game_board} />
      <div className={styles.result_box}>
        {gameOver && (
          <div className={styles.result_wrapper}>
            <p className={styles.game_over}>Game Over</p>
            <div className={styles.score_wrapper}>
              <p className={styles.score_text}>
                Score: <span>{snake.length - 1}</span>
              </p>
              <p className={styles.score_text}>
                Best Score: <span>{bestScore}</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <button
        disabled={!gameOver}
        className={styles.start_button}
        onClick={() => {
          setGameOver(false);
          setSnake([{ x: 10, y: 10 }]);
          setFood({ x: 15, y: 15, value: 1 });
          setDirection({ x: 1, y: 0 });
          setSpeed(500);
        }}
      >
        Start
      </button>
      <button className={styles.pause_button} onClick={() => setPause(!pause)}>
        {pause ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};

export default SnakeGame;
