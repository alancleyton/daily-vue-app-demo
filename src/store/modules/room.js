const state = {
  name: 'Guest',
  roomUrl: 'https://your-daily-domain.daily.co/room-name',
};

const getters = {
  name(state) {
    return state.name;
  },
  roomUrl() {
    return state.roomUrl;
  },
};

const mutations = {
  SET_NAME(state, name) {
    state.name = name;
  },
  SET_ROOM_URL(state, url) {
    state.roomUrl = url;
  },
};

const actions = {};

export const room = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
