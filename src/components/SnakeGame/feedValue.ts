let callCount = 0;

export const feedValue = () => {
  if (callCount < 3) {
    callCount++;
    return 1;
  }

  const rand = Math.random();

  if (rand < 0.85) {
    return 1;
  } else if (rand < 0.95) {
    return 5;
  } else {
    return 10;
  }
};
