import React, { useState, useEffect, useRef } from 'react';
import { Box, Button } from '@mui/material';

import { feedValue } from './feedValue';
import { CustomDialog } from '../CustomDialog/CustomDialog';

import styles from './snakeGame.module.scss';

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15, value: 1 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [speed, setSpeed] = useState(500);
  const [gameStatus, setGameStatus] = useState({ start: false, pause: false, over: false });
  const [bestScore, setBestScore] = useState(0);
  const [level, setLevel] = useState(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (level === 1) {
      setSpeed(500);
    } else if (level === 2) {
      setSpeed(400);
    } else if (level === 3) {
      setSpeed(300);
    }
  }, [level]);

  useEffect(() => {
    if (gameStatus.over) return;
    if (speed === 150) return;
    if (snake.length <= 50) return;
    if (snake.length > 50 && snake.length <= 100) {
      level === 1 ? setSpeed(450) : level === 2 ? setSpeed(350) : setSpeed(250);
    } else if (snake.length > 100 && snake.length <= 150) {
      level === 1 ? setSpeed(400) : level === 2 ? setSpeed(300) : setSpeed(200);
    } else if (snake.length > 150) {
      level === 1 ? setSpeed(350) : level === 2 ? setSpeed(250) : setSpeed(150);
    }
  }, [gameStatus.over, level, snake, speed]);

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
    if (!gameStatus.start) return;
    if (gameStatus.over) return;

    const moveSnake = setInterval(() => {
      if (gameStatus.pause) return;
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
          setGameStatus({ start: false, pause: false, over: true });
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
  }, [snake, direction, food, speed, bestScore, gameStatus.start, gameStatus.over, gameStatus.pause]);

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
      <Box className={styles.level_box}>
        {Array.from({ length: 3 }, (_, i) => (
          <Button
            key={i}
            color='warning'
            size='large'
            onClick={() => setLevel(i + 1)}
            variant={level === i + 1 ? 'outlined' : 'text'}
            sx={{ minWidth: '150px' }}
          >
            Level {i + 1}
          </Button>
        ))}
      </Box>
      <canvas ref={canvasRef} width='500' height='500' className={styles.game_board} />
      <Box className={styles.status_button}>
        <Button
          variant='outlined'
          color='success'
          size='large'
          onClick={() =>
            gameStatus.over || !gameStatus.start
              ? (setGameStatus((status) => ({ ...status, start: true, over: false })),
                setSnake([{ x: 10, y: 10 }]),
                setFood({ x: 15, y: 15, value: 1 }),
                setDirection({ x: 1, y: 0 }))
              : gameStatus.pause
                ? setGameStatus((status) => ({ ...status, pause: false }))
                : setGameStatus((status) => ({ ...status, pause: true }))
          }
        >
          {gameStatus.start ? (gameStatus.pause ? 'Resume' : 'Pause') : 'Start'}
        </Button>
      </Box>
      <CustomDialog
        open={gameStatus.over}
        handleClose={() => setGameStatus((status) => ({ ...status, over: false }))}
        title='Game Over'
        description={
          <div className={styles.score_wrapper}>
            <p className={styles.score_text}>
              Score: <span>{snake.length - 1}</span>
            </p>
            <p className={styles.score_text}>
              Best Score: <span>{bestScore}</span>
            </p>
          </div>
        }
      />
    </div>
  );
};

export default SnakeGame;
