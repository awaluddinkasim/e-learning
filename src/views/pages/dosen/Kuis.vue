<template>
  <div id="daftar-materi">
    <vs-button
      icon-pack="feather"
      icon="icon-plus"
      class="my-3"
      @click="toggleBuatKuis"
      >Kuis Baru</vs-button
    >

    <Modal v-if="showUploadMateri" @close="toggleBuatKuis">
      <h6>Buat Kuis Baru</h6>
      <vs-input
        label="Judul"
        placeholder=""
        v-model="formMateri.judul"
        size="large"
        class="w-full mt-6"
      />
      <vs-textarea
        v-model="formMateri.instruksi"
        label="Instruksi"
        class="w-full mt-6"
      />
      <vs-input
        label="Batas Kumpul"
        type="date"
        v-model="formMateri.deadline"
        size="large"
        class="w-full mt-6"
      />

      <input type="file" name="file" id="file" @change="handleFile($event)">
      <div class="flex flex-wrap justify-end my-3">
        <vs-button @click="uploadTugas">Upload Materi</vs-button>
      </div>
    </Modal>
    <template v-if="daftarKuis">
    <vx-card
      v-for="item in daftarKuis"
      :key="item.id"
      :title="item.judul"
      class="mb-5"
    >
      <p class="mb-3 px-3">
        {{ item.instruksi }}
      </p>

      <vs-row>
        <vs-col vs-type="flex" vs-w="6" vs-align="center">
          <small class="italic">Batas pengumpulan: {{ item.deadline }}</small>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
          <vs-button @click="hapus(item.id)" class="mr-1 bg-danger">Hapus</vs-button>
          <vs-button @click="download(item.id)">Download File</vs-button>
        </vs-col>
      </vs-row>
    </vx-card>
    </template>
  </div>
</template>

<script>
import Modal from "../../../layouts/components/modal/Modal.vue";
import axios from "@/axios.js";

export default {
  data() {
    return {
      formMateri: {
        judul: "",
        instruksi: "",
        deadline: null,
        file: ""
      },
      kode: this.$route.params.kode,
      daftarKuis: "",
      showUploadMateri: false
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    download(id) {
      window.open(axios.defaults.baseURL + '/download/kuis/' + id)
    },
    hapus(id) {
      this.$vs.loading()
      axios.delete('dosen/kuis/'+id).then((response) => {
        console.log(response)
        this.fetchDetail()
        this.$vs.loading.close()
      })
    },
    async fetchDetail() {
      let data = await axios.get("dosen/kuis/" + this.kode);
      this.daftarKuis = data.data.daftarKuis;
      console.log(data.data);
    },
    toggleBuatKuis() {
      this.showUploadMateri = !this.showUploadMateri;
    },
    handleFile(event) {
      this.formMateri.file = event.target.files[0]
    },
    uploadTugas() {
      this.$vs.loading()
      let formData = new FormData()
      formData.append('kode', this.kode)
      formData.append('judul', this.formMateri.judul)
      formData.append('instruksi', this.formMateri.instruksi)
      formData.append('deadline', this.formMateri.deadline)
      formData.append('file', this.formMateri.file)

      axios.post('dosen/kuis', formData, { headers: { 'Content-Type' : 'multipart/form-data' } }).then((response) => {
        console.log(response)
        this.toggleBuatKuis()
        this.fetchDetail()
        this.$vs.loading.close()
      })
    }
  },
  components: {
    Modal
  }
};
</script>
