import { createStore } from 'vuex';
import flashModule from './modules/flash';

interface State {
  ledColor: string;
}

export default createStore<State>({
  state: {
    ledColor: 'skyblue',
  },
  mutations: {
    setColor(state, color: string) {
      state.ledColor = color;
    },
  },

  modules: { flash: flashModule },
});
