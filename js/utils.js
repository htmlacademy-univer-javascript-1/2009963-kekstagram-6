const getRandomCount = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = (minId) => {
  let lastId = minId;

  return () => lastId++;
};


export { getRandomCount, createIdGenerator };
