import Worker from '../../workers/flashWorker?worker';
import { ActionContext } from 'vuex';

// Flash module
interface FlashState {
  isFlashingEnabled: boolean;
  isFlashing: boolean;
  worker: Worker | null;
}
type FlashActionContext = ActionContext<FlashState, any>;

const flashModule = {
  // set namespaced to true to avoid name collision
  // When namespaced: false is set in a Vuex module,
  // it means that the module's actions, mutations, getters,
  // and state are registered in the global namespace. This has several effects:
  // Actions and Mutations: You can call actions and mutations without specifying the module name.
  // For example, instead of dispatching an action with this.$store.dispatch('moduleName/actionName'), you'd use this.$store.dispatch('actionName').
  // Getters and State: Similarly, you access getters and state without referencing the module name. For example, this.$store.state.moduleName.stateProperty becomes this.$store.state.stateProperty, and getters are accessed with this.$store.getters['getterName'] instead of this.$store.getters['moduleName/getterName'].

  namespaced: true,

  state: () => ({
    isFlashingEnabled: true,
    isFlashing: false,
    worker: null,
  }),

  mutations: {
    setFlashingEnabled(state: FlashState, status: boolean) {
      state.isFlashingEnabled = status;
    },
    setFlashing(state: FlashState, status: boolean) {
      state.isFlashing = status;
    },
    setWorker(state: FlashState, worker: Worker | null) {
      state.worker = worker;
    },
  },

  actions: {
    toggleFlashing({ commit, state }: FlashActionContext, enable: boolean) {
      console.log('toggleFlashing', enable);
      if (state.worker) {
        const message = enable ? 'start' : 'stop';
        state.worker.postMessage(message);
        commit('setFlashingEnabled', enable);
        commit('setFlashing', !enable);
      }
    },
    initializeWorker({ commit, state }: FlashActionContext) {
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
    cleanupWorker({ state }: FlashActionContext) {
      if (state.worker) {
        state.worker.terminate();
      }
    },
  },
};

export default flashModule;
