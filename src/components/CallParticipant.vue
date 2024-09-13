<template>
  <div id="callParticipant" class="call-participant">
    <!-- Audio do participante -->
    <audio autoPlay playsInline :srcObject="audioSource">
      <track kind="captions" />
    </audio>

    <template v-if="participant.video">
      <div class="track relative w-full h-full">
        <!-- Video do participante -->
        <video :srcObject="videoSource" autoPlay muted playsInline></video>
        <p
          class="absolute flex items-center gap-2 bottom-0 left-0 text-white text-sm bg-slate-600 rounded-md w-fit p-2 m-2"
        >
          {{ participantName }}
          <template v-if="participant.audio">
            <img class="h-4" :src="micOn" alt="" />
          </template>
          <template v-else>
            <img class="h-4" :src="micOff" alt="" />
          </template>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import micOff from '../assets/mic_off.svg';
import micOn from '../assets/mic_on.svg';
import videoOff from '../assets/vid_off.svg';
import videoOn from '../assets/vid_on.svg';

export default {
  name: 'CallParticipant',
  props: {
    participant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      participantName: 'Você',
      videoSource: null,
      audioSource: null,
      micOn,
      micOff,
      videoOn,
      videoOff,
    };
  },
  mounted() {
    this.createParticipantVideoTrack(this.participant);
    this.createParticipantAudioTrack(this.participant);
  },
  updated() {
    // Gera as tracks de vídeo e áudio dos participantes remotos

    // Seta o nome do participante remoto
    if (!this.participant?.local) {
      this.participantName = this.participant?.user_name;
    }

    this.createParticipantVideoTrack(this.participant);
    this.createParticipantAudioTrack(this.participant);
  },
  methods: {
    // Este método gera as tracks de vídeo e áudio a partir da classe MediaStream do javascript
    // Atualiza uma stream existente ou retorna uma nova stream
    // O primeiro parâmetro `stream` é o objeto contendo as tracks de áudio ou de vídeo
    // O segundo parâmetro é a nova track que pode ser criada se não existir uma
    updateSource(stream, newTrack) {
      const existingTracks = stream?.getTracks();

      // Cria uma nova track se não existir uma
      if (!existingTracks || existingTracks.length === 0) {
        return new MediaStream([newTrack]);
      }

      const existingTrack = existingTracks[0];

      // Se a track for diferente da nova track, remove a track existe e cria uma nova
      if (newTrack.id !== existingTrack.id) {
        stream.removeTrack(existingTrack);
        stream.addTrack(newTrack);
      }

      return null;
    },

    createParticipantVideoTrack() {
      const p = this.participant;

      // Não faz nada se o participante estiver com a câmera desligada
      if (!this.participant?.video) return;

      // Atualiza videoSource a partir do método updateSource
      const track = p.tracks.video.persistentTrack;
      const newStream = this.updateSource(this.videoSource, track);
      if (newStream) {
        this.videoSource = newStream;
      }
    },
    createParticipantAudioTrack() {
      const p = this.participant;

      // Não faz nada se o participante estiver com a áudio desligado
      if (!p || p.local || !p.audio) return;

      const track = p.tracks.audio.persistentTrack;
      const newStream = this.updateSource(this.audioSource, track);
      if (newStream) {
        this.audioSource = newStream;
      }
    },
  },
};
</script>

<style scoped>
video {
  width: 100%;
  border-radius: 16px;
}
</style>
