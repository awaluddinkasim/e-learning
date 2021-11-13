<template>
  <div id="profil">
    <vx-card :title="userData.name" class="pb-5" />
    <div class="vx-row py-5">
      <div class="vx-col md:w-1/2">
        <img :src="require('@/assets/images/profile.svg')" class="w-full p-5" />
      </div>
      <div class="vx-col md:w-1/2">
        <vx-card v-if="!isEditing">
          <div class="">
            <h6>Username:</h6>
            <p>{{ userData.username }}</p>
          </div>
          <div class="mt-5">
            <h6>Nama Lengkap:</h6>
            <p>{{ userData.name }}</p>
          </div>
          <div class="mt-5">
            <h6>Jenis Kelamin:</h6>
            <p>{{ userData.jk == "L" ? 'Laki-laki' : 'Perempuan' }}</p>
          </div>
          <div class="mt-5">
            <h6>Program Studi:</h6>
            <p>{{ userData.prodi }}</p>
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

          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-select
                v-model="formEdit.prodi"
                class="w-full select-large mt-5"
                label="Program Studi"
              >
                <vs-select-item
                  :key="index"
                  :value="item.value"
                  :text="item.text"
                  v-for="(item, index) in daftarProdi"
                  class="w-full"
                />
              </vs-select>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-select
                v-model="formEdit.jk"
                class="w-full select-large mt-5"
                label="Jenis Kelamin"
              >
                <vs-select-item value="L" text="Laki-laki" />
                <vs-select-item value="P" text="Perempuan" />
              </vs-select>
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
        password: "",
        prodi: "",
        jk: ""
      },
      daftarProdi: [
        // teknik
        {
          index: 0,
          text: "Teknik Pertambangan",
          value: "Teknik Pertambangan"
        },
        {
          index: 1,
          text: "Teknik Mesin",
          value: "Teknik Mesin"
        },
        {
          index: 2,
          text: "Teknik Informatika",
          value: "Teknik Informatika"
        }
      ]
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
      this.formEdit.prodi = this.userData.prodi;
      this.formEdit.jk = this.userData.jk;
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
      let save = await axios.post("/dosen/profile", this.formEdit);
      if (save.status == 200) {
        this.signOut().then(() => {
          this.$vs.loading.close();
          this.$router.push("/login");
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
