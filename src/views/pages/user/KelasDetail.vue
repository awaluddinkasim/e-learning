<template>
  <div id="kelas-detail-page" v-if="dataKelas">
    <h3>{{ dataKelas.nama_kelas.toUpperCase() }}</h3>
    <p>
      Kode Kelas: <b>{{ kode }}</b>
    </p>
    <div class="vx-row mt-4">
      <div class="vx-col w-1/2 md:w-1/3">
        <div class="btn-card"
          @click="$router.push('/user/kelas/' + kode + '/materi')"
        >
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="BookOpenIcon"
            statisticTitle="Materi"
            :statistic="materi"
            color="success"
          />
        </div>
      </div>
      <div class="vx-col w-1/2 md:w-1/3">
        <div
          class="btn-card"
          @click="$router.push('/user/kelas/' + kode + '/tugas')"
        >
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="Edit2Icon"
            :statistic="tugas"
            statisticTitle="Tugas"
          />
        </div>
      </div>

      <div class="vx-col w-1/2 md:w-1/3">
        <div class="btn-card"
          @click="$router.push('/user/kelas/' + kode + '/kuis')"
        >
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="CopyIcon"
            :statistic="kuis"
            statisticTitle="Kuis"
            color="warning"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios.js";
import StatisticsCardLine from "@/components/statistics-cards/StatisticsCardLine.vue";

export default {
  data() {
    return {
      kode: this.$route.params.kode,
      dataKelas: "",
      materi: 0,
      tugas: 0,
      kuis: 0,
    };
  },
  created() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      let data = await axios.get("kelas/data/" + this.kode);
      this.dataKelas = data.data.detail;
      this.materi = data.data.materi;
      this.tugas = data.data.tugas;
      this.kuis = data.data.kuis;
      this.mahasiswa = data.data.mahasiswa;
    },
    openVideoConference() {
      let routeData = this.$router.resolve({name: 'video-conference-dosen', params: {kode: this.kode}});
      window.open(routeData.href, '_blank')
    }
  },
  components: {
    StatisticsCardLine
  }
};
</script>

<style>
.vx-col .btn-card {
  cursor: pointer;
}
</style>
