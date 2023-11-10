// flashWorker.ts
let intervalId: number | undefined;

onmessage = (e: MessageEvent) => {
  if (e.data === 'start') {
    intervalId = setInterval(() => {
      postMessage('toggle');
    }, 1000);
  } else if (e.data === 'stop' && intervalId !== undefined) {
    clearInterval(intervalId);
  }
};
