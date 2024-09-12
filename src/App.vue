<template>
  <div class="flex items-center justify-center w-full h-screen">
    <template v-if="status === 'idle'">
      <join-call-form />
    </template>
    <template v-else>
      <call-meeting />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import JoinCallForm from './components/JoinCallForm.vue';
import CallMeeting from './components/CallMeeting.vue';

export default {
  name: 'App',
  components: {
    JoinCallForm,
    CallMeeting,
  },
  computed: {
    ...mapGetters('call', ['status', 'name', 'url']),
  },
};
</script>
