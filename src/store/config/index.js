import { createStore } from 'vuex';
import { modules } from '../modules';

/**
 * Configure a store config with all modules and returns a store
 */
export function configureStore() {
  const store = createStore({
    modules,
  });

  return store;
}
