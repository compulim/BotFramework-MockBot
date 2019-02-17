import createAutoResetEvent from 'auto-reset-event';

export default function serial(fn) {
  const acquire = createAutoResetEvent();

  return async (...args) => {
    const release = await acquire();

    try {
      return await fn(...args);
    } finally {
      release();
    }
  };
}
