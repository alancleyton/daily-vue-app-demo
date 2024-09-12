const state = {
  status: 'idle',
  name: 'Guest',
  url: 'https://your-daily-domain.daily.co/room-name',
};

const getters = {
  status(state) {
    return state.status;
  },
  name(state) {
    return state.name;
  },
  url() {
    return state.url;
  },
};

const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_URL(state, url) {
    state.url = url;
  },
};

const actions = {
  joinCall({ commit }, payload) {
    const { status, name, url } = payload;
    commit('SET_STATUS', status);
    commit('SET_NAME', name);
    commit('SET_URL', url);
  },
  leaveCall({ commit }) {
    commit('SET_STATUS', 'idle');
  },
};

export const room = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
