<template>
  <div id="profil">
    <vx-card :title="userData.name" class="pb-5" />
    <div class="vx-row py-5">
      <div class="vx-col md:w-1/2 text-center">
        <img :src="require('@/assets/images/profile.svg')" class="w-3/4 p-5" />
      </div>
      <div class="vx-col md:w-1/2 w-full">
        <vx-card v-if="!isEditing">
          <div class="">
            <h6>Username:</h6>
            <p>{{ userData.username }}</p>
          </div>
          <div class="mt-5">
            <h6>Nama Lengkap:</h6>
            <p>{{ userData.name }}</p>
          </div>

          <vs-button class="bg-success w-full mt-5" @click="toggleEdit"
            >Edit</vs-button
          >
        </vx-card>
        <vx-card v-else>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-input
                label="Username"
                v-model="formEdit.username"
                class="w-full"
                disabled
              />
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mt-5">
              <vs-input
                label="Nama Lengkap"
                v-model="formEdit.name"
                class="w-full"
              />
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mt-5">
              <vs-input
                label="Password"
                v-model="formEdit.password"
                class="w-full"
                type="password"
              />
              <small>* Kosongkan jika tidak ingin mengganti password</small>
            </div>
          </div>
          <vs-button class="bg-primary w-full mt-5" @click="confirmSave"
            >Simpan</vs-button
          >
          <vs-button class="bg-danger w-full mt-2" @click="toggleEdit"
            >Batal</vs-button
          >
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "@/axios.js";

export default {
  data() {
    return {
      isEditing: false,
      formEdit: {
        id: "",
        name: "",
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      signOut: "auth/signOut"
    }),
    toggleEdit() {
      this.isEditing = !this.isEditing;
      this.formEdit.id = this.userData.id;
      this.formEdit.name = this.userData.name;
      this.formEdit.username = this.userData.username;
    },
    confirmSave() {
      this.$vs.dialog({
        type: "confirm",
        title: `Confirm Save`,
        text: `Anda akan diminta untuk login ulang.`,
        accept: this.saveData,
        acceptText: "Lanjutkan"
      });
    },
    async saveData() {
      this.$vs.loading();
      let save = await axios.post("/admin/profile", this.formEdit);
      if (save.status == 200) {
        this.signOut().then(() => {
          this.$vs.loading.close();
          this.$router.push("/admin/login");
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      userData: "auth/userData"
    })
  }
};
</script>

<style></style>
