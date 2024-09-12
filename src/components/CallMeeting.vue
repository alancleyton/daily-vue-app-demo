<template>
  <main id="callMeeting" class="call-meeting">
    <!-- Loader apresentado quando chamada é iniciada -->
    <template v-if="isLoading">
      <dot-loader />
    </template>

    <template v-else>
      <div class="block">
        <!-- Lista todos os participantes da chamada -->
        <div v-if="participants">
          <template v-for="p in participants" :key="p.session_id">
            <call-participant :participant="p" />
          </template>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import daily from '@daily-co/daily-js';

import DotLoader from './DotLoader.vue';
import CallParticipant from './CallParticipant.vue';

export default {
  name: 'CallMeeting',
  components: {
    DotLoader,
    CallParticipant,
  },
  data() {
    return {
      isLoading: false,
      callObject: null,
      participants: null,
      screen: null,
    };
  },
  mounted() {
    // Seta as options com a url da sala
    const options = {
      url: this.url,
    };

    // Cria a instância do Daily call object
    const co = daily.createCallObject(options);

    // Assina o objeto instanciado no data
    this.callObject = co;

    // Entra na chamada com o nome do participante
    co.join({ userName: this.name });

    // Add call and participant event handler
    // Adiciona os eventos e participantes a chamada
    co.on('joining-meeting', this.handleJoiningMeeting)
      .on('joined-meeting', this.updateParticpants)
      .on('participant-joined', this.updateParticpants)
      .on('participant-updated', this.updateParticpants)
      .on('participant-left', this.updateParticpants);
  },
  methods: {
    // Método chamado ao iniciar a chamada, apresenta o loading na tela
    handleJoiningMeeting() {
      this.isLoading = true;
    },
    // Esse método é chamado para cada participante que entra na chamada
    updateParticpants(e) {
      // console.log('[EVENT] ', e);

      // O Método não faz nada se o callObject não estiver instanciado
      if (!this.callObject) return;

      // Adiciona os participantes a partir do callObject
      const participants = this.callObject.participants();
      this.participants = Object.values(participants);

      // TODO: Isso faz oque?
      // Filtra os participantes com video track
      const screen = this.participants.filter(
        participant => participant.screenVideoTrack,
      );

      if (screen?.length && !this.screen) {
        // console.log('[SCREEN]', screen);
        this.screen = screen[0];
      } else if (!screen?.length && this.screen) {
        this.screen = null;
      }

      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters('call', ['status', 'name', 'url']),
  },
};
</script>
