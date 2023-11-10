import { createStore } from 'vuex';
import Worker from '../workers/flashWorker?worker';

interface State {
  isFlashingEnabled: boolean;
  isFlashing: boolean;
  worker: Worker | null;
}

export default createStore<State>({
  state: {
    isFlashingEnabled: true,
    isFlashing: false,
    worker: null,
  },
  mutations: {
    setFlashingEnabled(state, status: boolean) {
      state.isFlashingEnabled = status;
    },
    setFlashing(state, status: boolean) {
      state.isFlashing = status;
    },
    setWorker(state, worker: Worker | null) {
      state.worker = worker;
    },
  },
  actions: {
    toggleFlashing({ commit, state }, enable: boolean) {
      console.log('toggleFlashing', enable);
      if (state.worker) {
        const message = enable ? 'start' : 'stop';
        state.worker.postMessage(message);
        commit('setFlashingEnabled', enable);
        commit('setFlashing', !enable);
      }
    },
    initializeWorker({ commit, state }) {
      const worker = new Worker();
      commit('setWorker', worker);
      worker.postMessage(state.isFlashingEnabled ? 'start' : 'stop');
      worker.onmessage = (e: MessageEvent) => {
        if (e.data === 'toggle') {
          console.log('toggle');
          commit('setFlashing', !state.isFlashing);
        }
      };
    },
    cleanupWorker({ state }) {
      if (state.worker) {
        state.worker.terminate();
      }
    },
  },
});
