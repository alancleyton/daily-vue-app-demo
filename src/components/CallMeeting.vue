<template>
  <main
    id="callMeeting"
    class="relative flex items-center justify-center w-full h-full"
  >
    <!-- Loader apresentado quando chamada é iniciada -->
    <template v-if="isLoading">
      <dot-loader />
    </template>

    <!-- Lista todos os participantes da chamada -->
    <template v-else>
      <div v-if="participants" class="flex items-center gap-2">
        <template v-for="p in participants" :key="p.session_id">
          <call-participant :participant="p" />
        </template>
      </div>
    </template>

    <!-- Botões para controlar o áudio e vídeo do participante local-->
    <template v-if="localParticipant">
      <call-controls
        :participant="localParticipant"
        :handleAudio="handleAudio"
        :handleVideo="handleVideo"
        :handleLeave="leaveAndCleanUp"
      />
    </template>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import daily from '@daily-co/daily-js';

import DotLoader from './DotLoader.vue';
import CallParticipant from './CallParticipant.vue';
import CallControls from './CallControls.vue';

export default {
  name: 'CallMeeting',
  components: {
    DotLoader,
    CallParticipant,
    CallControls,
  },
  data() {
    return {
      isLoading: false,
      callObject: null,
      participants: null,
      localParticipant: null,
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
  unmounted() {
    // Limpa os eventos do daily ao desmontar o componente
    this.callObject
      .off('joining-meeting', this.handleJoiningMeeting)
      .off('joined-meeting', this.updateParticpants)
      .off('participant-joined', this.updateParticpants)
      .off('participant-updated', this.updateParticpants)
      .off('participant-left', this.updateParticpants);
  },
  methods: {
    ...mapActions('call', ['leaveCall']),

    // Método chamado ao iniciar a chamada, apresenta o loading na tela
    handleJoiningMeeting() {
      this.isLoading = true;
    },
    // Esse método é chamado para cada participante que entra na chamada
    updateParticpants() {
      // O Método não faz nada se o callObject não estiver instanciado
      if (!this.callObject) return;

      // Adiciona os participantes a partir do callObject
      const participants = this.callObject.participants();
      this.participants = Object.values(participants);

      // Seta o participante local
      this.localParticipant = this.participants.find(
        participant => participant.local,
      );

      this.isLoading = false;
    },
    // Método chamado para ligar e desligar o audio do participente local
    handleAudio() {
      const audioOn = this.callObject.localAudio();
      this.callObject.setLocalAudio(!audioOn);
    },
    // Método chamado para ligar e desligar a câmera do participente local
    handleVideo() {
      const videoOn = this.callObject.localVideo();
      this.callObject.setLocalVideo(!videoOn);
    },
    // Método chamado para sair da chamada
    leaveAndCleanUp() {
      this.callObject.leave().then(() => {
        // Destrói o objeto instanciado da chamada.
        this.callObject.destroy();
        this.leaveCall();
      });
    },
  },
  computed: {
    ...mapGetters('call', ['status', 'name', 'url']),
  },
};
</script>
