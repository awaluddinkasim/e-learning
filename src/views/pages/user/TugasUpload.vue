<template>
  <div id="daftar-tugas">
    <template v-if="detailTugas">
      <div class="px-2">
        <div class="flex -mx-2">
          <div class="w-3/4 px-2">
            <vx-card :title="detailTugas.nama_tugas" class="mb-3">
              <p>{{ detailTugas.deskripsi }}</p>
            </vx-card>
          </div>
          <div class="w-1/3 px-2">
            <vx-card class="mb-3">
              <div class="my-3">
                <input type="file" name="file" id="file" @change="handleFile($event)" :disabled="isCommitted">
              </div>
              <vs-button class="w-full" @click="uploadAssignment" :disabled="isCommitted">{{ isCommitted ? 'Tugas dikirim' : 'Upload' }}</vs-button>
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
      idTugas: this.$route.params.id,
      formTugas: {
        uploader: "",
        file: "",
      },
      detailTugas: "",
      nilai: null,
      isCommitted: false,
    };
  },
  created() {
    this.fetchDetail();
    this.fetchTugas();
    this.formTugas.uploader = this.dataUser.id;
  },
  computed: {
    ...mapGetters({
      dataUser: "auth/userData"
    })
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("tugas/" + this.kode + "/" + this.idTugas);
      this.detailTugas = data.data.detailTugas;
      console.log(data.data);
    },
    async fetchTugas() {
      let data = await axios.get("tugas/" + this.kode + "/" + this.idTugas + "/" + this.dataUser.id);
      if (data.data.message == "Tugas Ada") {
        this.isCommitted = true
        this.nilai = data.data.nilai
      }
    },
    handleFile(event) {
      this.formTugas.file = event.target.files[0]
    },
    uploadAssignment() {
      this.$vs.loading()
      let formData = new FormData()
      formData.append('uploader', this.formTugas.uploader)
      formData.append('file', this.formTugas.file)

      axios.post('tugas/' + this.kode + '/' + this.idTugas, formData, { headers: { 'Content-Type' : 'multipart/form-data' } }).then((response) => {
        console.log(response)
        this.fetchTugas()
        this.$vs.loading.close()
      })
    }
  }
};
</script>
