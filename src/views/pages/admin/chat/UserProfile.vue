<!-- =========================================================================================
    File Name: UserProfile.vue
    Description: user profile sidebar
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="parentx-demo-2">

        <vs-sidebar parent="#chat-app" :position-right="!isLoggedInUser" :hidden-background="false" v-model="activeLocal" id="chat-profile-sidebar" class="items-no-padding">

            <div class="header-sidebar relative flex flex-col p-0" slot="header">
                <feather-icon icon="XIcon" svgClasses="m-2 cursor-pointer absolute top-0 right-0" @click="$emit('closeProfileSidebar', false)"></feather-icon>


                <div class="relative inline-flex mx-auto mb-5 mt-6">
                    <vs-avatar class="m-0 border-white border-2 border-solid shadow-md" :src="avatar" size="70px" style="opacity: .6" />
                    <div class="h-5 w-5 border-white border-2 border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + statusColor"></div>
                </div>

                <h4 class="mr-2 self-center">{{ chatUser.name }}</h4>
            </div>
        </vs-sidebar>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default{
    props: {
        userId: {
            type: Number,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        isLoggedInUser: {
          type: Boolean,
          required: true,
        }
    },
    data() {
        return {
          avatar: require('@/assets/images/user.png'),
            counterDanger: false,
            settings: { // perfectscrollbar settings
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
        }
    },
    computed: {
        chatUser() {
          return this.$store.getters['chat/contactDosen'](this.userId)
        },
        activeLocal: {
            get() {
                return this.active
            },
            set(value) {
                this.$emit('closeProfileSidebar', value)
            }
        },
        statusColor() {
            const userStatus = "online"

            if(userStatus == "online"){
                return "success"
            }else if(userStatus == "do not disturb"){
                return "danger"
            }else if(userStatus == "away"){
                return "warning"
            }else{
                return "grey"
            }
        },
    },
    components:{
        VuePerfectScrollbar,
    }
}
</script>
