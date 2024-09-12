<template>
  <form class="w-80" @submit.prevent="joinCallMeeting">
    <div class="mb-6">
      <label
        for="name"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Participant Name</label
      >
      <input
        type="text"
        id="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        v-model="name"
      />
    </div>
    <div class="mb-6">
      <label
        for="url"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Daily Room URL</label
      >
      <input
        type="text"
        id="url"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="https://your-daily-domain.daily.co/room-name"
        required
        v-model="url"
      />
    </div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full"
    >
      Join call
    </button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'joinCallForm',
  data() {
    return {
      name: '',
      url: null,
    };
  },
  methods: {
    ...mapActions('call', ['joinCall']),

    joinCallMeeting() {
      this.joinCall({
        status: 'incall',
        name: this.name,
        url: this.url,
      });
    },
  },
};
</script>
