<template>
  <div>
    <h2>Hello World</h2>
    <p>{{ name }}</p>
    <p>{{ roomUrl }}</p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Click me
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('room', ['name', 'roomUrl']),
  },
};
</script>
