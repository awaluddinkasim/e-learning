<!-- =========================================================================================
    File Name: TextareaLabel.vue
    Description: Add lable to textarea
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vx-card title="Label" code-toggler>
    <span>If you need to add a label you can use the label property</span>
    <div class="mt-5">
      <vs-textarea label="Label in Textarea" v-model="textarea" />
    </div>
    <template slot="codeContainer">
      <template>
        <div>
          <vs-textarea label="Label in Textarea" v-model="textarea" />
        </div>
      </template>
    </template>
  </vx-card>
</template>
<script>
export default {
  data: () => ({
    textarea: ""
  })
};
</script>
