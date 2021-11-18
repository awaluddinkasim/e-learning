<template>
  <div id="daftar-tugas">
    <template v-if="detailKuis">
      <div class="px-2">
        <div class="flex -mx-2">
          <div class="w-3/4 px-2">
            <vx-card :title="detailKuis.judul" class="mb-3">
              <p>{{ detailKuis.instruksi }}</p>
            </vx-card>
          </div>
          <div class="w-1/3 px-2">
            <vx-card class="mb-3">
              <div class="my-3">
                <input type="file" name="file" id="file" @change="handleFile($event)" :disabled="isCommitted">
              </div>
              <vs-button class="w-full" @click="uploadAssignment" :disabled="isCommitted">{{ isCommitted ? 'Jawaban dikirim' : 'Upload' }}</vs-button>
              <template v-if="isCommitted">
                <div class="mt-5 text-center" v-if="nilai">
                  <p>Nilai Anda</p>
                  <h1>{{ nilai }}</h1>
                </div>
                <div class="mt-5 text-center" v-else>
                  <p>Menunggu penilaian</p>
                </div>
              </template>
            </vx-card>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "@/axios.js";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      idKuis: this.$route.params.id,
      formKuis: {
        uploader: "",
        file: "",
      },
      detailKuis: "",
      isCommitted: false,
      nilai: null
    };
  },
  created() {
    this.fetchDetail();
    this.fetchTugas();
    this.formKuis.uploader = this.dataUser.id;
  },
  computed: {
    ...mapGetters({
      dataUser: "auth/userData"
    })
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("kuis/" + this.kode + "/" + this.idKuis);
      this.detailKuis = data.data.detailKuis;
      console.log(data.data);
    },
    async fetchTugas() {
      let data = await axios.get("kuis/" + this.kode + "/" + this.idKuis + "/" + this.dataUser.id);
      if (data.data.message == "Kuis Ada") {
        this.isCommitted = true
        this.nilai = data.data.nilai
      }
    },
    handleFile(event) {
      this.formKuis.file = event.target.files[0]
    },
    uploadAssignment() {
      this.$vs.loading()
      let formData = new FormData()
      formData.append('uploader', this.formKuis.uploader)
      formData.append('file', this.formKuis.file)

      axios.post('kuis/' + this.kode + '/' + this.idKuis, formData, { headers: { 'Content-Type' : 'multipart/form-data' } }).then((response) => {
        console.log(response)
        this.fetchTugas()
        this.$vs.loading.close()
      })
    }
  }
};
</script>
