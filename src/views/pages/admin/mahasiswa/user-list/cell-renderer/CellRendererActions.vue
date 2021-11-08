<template>
    <div class="text-center">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="edit" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        name: 'CellRendererActions',
        computed: {
          user() {
            return {
              tipe: "user",
              id: this.params.data.id,
              username: this.params.data.username,
              name: this.params.data.name,
              jk: this.params.data.jk,
              prodi: this.params.data.prodi,
            }
          }
        },
        methods: {
          ...mapActions({
            deleteUser: 'userManagement/deleteUser',
            fetchUsers: 'userManagement/fetchUsers'
          }),
          edit() {
            this.$router.push("/admin/mahasiswa/" + this.params.data.id).catch(() => {})

            /*
              Below line will be for actual product
              Currently it's commented due to demo purpose - Above url is for demo purpose

              this.$router.push("/apps/user/user-edit/" + this.params.data.id).catch(() => {})
            */
          },
          confirmDeleteRecord() {
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Confirm Delete`,
              text: `Yakin ingin menghapus "${this.params.data.name}"`,
              accept: this.deleteRecord,
              acceptText: "Delete"
            })
          },
          deleteRecord() {
            // console.log(this.user)
            this.$vs.loading()
            this.deleteUser(this.user)
            setTimeout(() => {
              this.$vs.loading.close()
              this.fetchUsers("user")
            }, 1000);
            this.showDeleteSuccess()

            /* Below two lines are just for demo purpose */


            /* UnComment below lines for enabling true flow if deleting user */
            // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
            //   .then(()   => { this.showDeleteSuccess() })
            //   .catch(err => { console.error(err)       })
          },
          showDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'User Deleted',
              text: 'Akun tersebut sudah dihapus'
            })
          }
        }
    }
</script>
