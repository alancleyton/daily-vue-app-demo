<template>
  <div class="absolute bottom-0 mb-4">
    <div class="flex items-center gap-4">
      <button
        class="py-3 px-4 bg-slate-600 hover:bg-slate-700 rounded-md"
        @click="handleAudio"
      >
        <template v-if="participant.audio">
          <img class="h-6" :src="micOn" alt="" />
        </template>
        <template v-else>
          <img class="h-6" :src="micOff" alt="" />
        </template>
      </button>

      <button
        class="py-3 px-4 bg-slate-600 hover:bg-slate-700 rounded-md"
        @click="handleVideo"
      >
        <template v-if="participant.video">
          <img class="h-6" :src="videoOn" alt="" />
        </template>
        <template v-else>
          <img class="h-6" :src="videoOff" alt="" />
        </template>
      </button>

      <button
        class="py-3 px-4 bg-red-600 hover:bg-red-700 rounded-md"
        @click="handleLeave"
      >
        <img class="h-6" :src="leave" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import micOff from '../assets/mic_off.svg';
import micOn from '../assets/mic_on.svg';
import videoOff from '../assets/vid_off.svg';
import videoOn from '../assets/vid_on.svg';
import leave from '../assets/leave_call.svg';

export default {
  name: 'CallControls',
  props: {
    participant: {
      type: Object,
      required: true,
    },
    handleAudio: {
      type: Function,
      required: true,
    },
    handleVideo: {
      type: Function,
      required: true,
    },
    handleLeave: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      micOn,
      micOff,
      videoOn,
      videoOff,
      leave,
    };
  },
};
</script>
