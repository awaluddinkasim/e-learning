<template>
  <div id="daftar-tugas" class="p-3">

  <vs-alert active="true" class="mb-3">
      {{ message }}
  </vs-alert>

    <vx-card class="bg-dark">
      <div class="grid grid-flow-row grid-cols-3 grid-rows-3 gap-4"></div>
        <div id="video-chat-window"></div>
    </vx-card>
  </div>
</template>

<script>
import axios from "@/axios.js";
import { connect, createLocalVideoTrack } from "twilio-video";

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      accessToken: "",
      message: ""
    };
  },
  methods: {
    getAccessToken: function() {
      const _this = this;

      // Request a new token
      axios
        .get("/access_token")
        .then(function(response) {
          _this.accessToken = response.data.token;
          console.log('Token didapatkan')
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          _this.connectToRoom();
        });
    },
    connectToRoom: function() {
      connect(this.accessToken, { name: this.kode }).then(
        room => {
          console.log(`Successfully joined a Room: ${room}`);
          this.message = `Successfully joined a Room: ${room}`;

          const videoChatWindow = document.getElementById("video-chat-window");

          createLocalVideoTrack().then(track => {
            videoChatWindow.appendChild(track.attach());
          });

          room.on("participantConnected", participant => {
            console.log(`Participant "${participant.identity}" connected`);
            this.message = `Participant "${participant.identity}" connected`;

            participant.tracks.forEach(publication => {
              if (publication.isSubscribed) {
                const track = publication.track;
                videoChatWindow.appendChild(track.attach());
              }
            });

            participant.on("trackSubscribed", track => {
              videoChatWindow.appendChild(track.attach());
            });
          });
          room.on("disonnected", participant => {
            this.message = `Participant "${participant.identity}" disconnected`;
          });
        },
        error => {
          console.error(`Unable to connect to Room: ${error.message}`);
          this.message = `Unable to connect to Room: ${error.message}`;
        }
      );
    }
  },
  mounted: function() {
    console.log("Video chat room loading...");
    this.message = "Video chat room loading...";

    this.getAccessToken();
  }
};
</script>

<style>
#video-chat-window video {
  width: 33%;
  padding: 0px 10px;
}
</style>
