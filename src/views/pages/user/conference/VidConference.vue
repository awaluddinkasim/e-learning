<template>
  <div id="daftar-tugas" class="p-3">
    <vs-alert active="true" class="mb-3">
      {{ message }}
    </vs-alert>

    <vx-card class="bg-dark">
      <div id="my-video-chat-window"></div>
      <div class="grid grid-flow-row grid-cols-3 grid-rows-3 gap-4">
        <div id="video-chat-window"></div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from "@/axios.js";
import Twilio, {
  connect,
  createLocalTracks,
  createLocalVideoTrack
} from "twilio-video"

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      data: {},
      localTrack: false,
      remoteTrack: "",
      activeRoom: "",
      previewTracks: "",
      identity: "",
      roomName: null,
      message: ""
    };
  },
  methods: {
    async getAccessToken() {
      return await axios.get(`/access_token?room_name=${this.kode}`);
    },

    // Attach the Tracks to the DOM.
    attachTracks(tracks, container) {
      tracks.forEach(function(track) {
        container.appendChild(track.attach());
      });
    },

    // Attach the Participant's Tracks to the DOM.
    attachParticipantTracks(participant, container) {
      let tracks = Array.from(participant.tracks.values());
      this.attachTracks(tracks, container);
    },

    // Detach the Tracks from the DOM.
    detachTracks(tracks) {
      tracks.forEach(track => {
        track.detach().forEach(detachedElement => {
          detachedElement.remove();
        });
      });
    },

    // Detach the Participant's Tracks from the DOM.
    detachParticipantTracks(participant) {
      let tracks = Array.from(participant.tracks.values());
      this.detachTracks(tracks);
    },

    // Leave Room.
    leaveRoomIfJoined() {
      if (this.activeRoom) {
        this.activeRoom.disconnect();
      }
    },

    // Create a new chat
    createChat(room_name) {
      console.log(room_name)
      const VueThis = this;

      this.getAccessToken().then(data => {
        VueThis.roomName = null;
        const token = data.data.token;

        console.log(token)
        let connectOptions = {
          name: room_name,
          // logLevel: 'debug',
          audio: true,
          video: { width: 400 }
        };
        // before a user enters a new room,
        // disconnect the user from they joined already
        this.leaveRoomIfJoined();

        // remove any remote track when joining a new room
        document.getElementById("video-chat-window").innerHTML = "";

        Twilio.connect(token, connectOptions).then(function(room) {
          VueThis.message = 'Successfully joined a Room: ' + room_name;
          console.log(room.participants)

          // set active toom
          VueThis.activeRoom = room;
          VueThis.roomName = room_name;

          // Attach the Tracks of all the remote Participants.
          room.participants.forEach(function(participant) {
            console.log(participant)
            let previewContainer = document.getElementById("video-chat-window");
            VueThis.attachParticipantTracks(participant, previewContainer);
          });

          // When a Participant joins the Room, log the event.
          room.on("participantConnected", function(participant) {
            this.message = "Joining: '" + participant.identity + "'";
          });

          // When a Participant adds a Track, attach it to the DOM.
          room.on("trackAdded", function(track) {
            let previewContainer = document.getElementById("video-chat-window");
            VueThis.attachTracks([track], previewContainer);
          });

          // When a Participant removes a Track, detach it from the DOM.
          room.on("trackRemoved", function(track) {
            VueThis.detachTracks([track]);
          });

          // When a Participant leaves the Room, detach its Tracks.
          room.on("participantDisconnected", function(participant) {
            this.message =
              "Participant '" + participant.identity + "' left the room";
            VueThis.detachParticipantTracks(participant);
          });

          // if local preview is not active, create it
          if (!VueThis.localTrack) {
            createLocalVideoTrack().then(track => {
              let localMediaContainer = document.getElementById("my-video-chat-window");

              localMediaContainer.appendChild(track.attach());
              VueThis.localTrack = true;
            });
          }
        });
      });
    }
  },
  created() {
    this.message = 'Loading...';
    this.createChat(this.kode);
    window.addEventListener("beforeunload", this.leaveRoomIfJoined);
  }
};
</script>

<style>
#my-video-chat-window video {
  width: 33%;
  padding: 0px;
}
</style>
