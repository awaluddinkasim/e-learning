<template>
  <div id="daftar-materi">
    <vs-button
      icon-pack="feather"
      icon="icon-plus"
      class="my-3"
      @click="toggleUploadMateri"
      >Upload Materi</vs-button
    >

    <Modal v-if="showUploadMateri" @close="toggleUploadMateri">
      <h6>Upload Materi Baru</h6>
      <vs-input
        label="Judul"
        placeholder=""
        v-model="formMateri.judul"
        size="large"
        class="w-full mt-6"
      />
      <vs-textarea
        v-model="formMateri.deskripsi"
        label="Deskripsi"
        class="w-full mt-6"
      />

      <input type="file" name="file" id="file" @change="handleFile($event)">
      <div class="flex flex-wrap justify-end my-3">
        <vs-button @click="uploadTugas">Upload Materi</vs-button>
      </div>
    </Modal>
    <template v-if="daftarMateri">
    <vx-card
      v-for="item in daftarMateri"
      :key="item.id"
      :title="item.judul"
      class="mb-5"
    >
      <p class="mb-3 px-3">
        {{ item.deskripsi }}
      </p>

      <vs-row>
        <vs-col vs-type="flex" vs-w="6" vs-align="center">
          <small class="italic">Dibuat pada: {{ item.created_at }}</small>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="end" vs-align="center" vs-w="6">
          <vs-button>Download Materi</vs-button>
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
        deskripsi: "",
        file: ""
      },
      kode: this.$route.params.kode,
      daftarMateri: "",
      showUploadMateri: false
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("dosen/materi/" + this.kode);
      this.daftarMateri = data.data.daftarMateri;
      console.log(data.data);
    },
    toggleUploadMateri() {
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
      formData.append('deskripsi', this.formMateri.deskripsi)
      formData.append('file', this.formMateri.file)

      axios.post('dosen/materi', formData, { headers: { 'Content-Type' : 'multipart/form-data' } }).then((response) => {
        console.log(response)
        this.toggleUploadMateri()
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
