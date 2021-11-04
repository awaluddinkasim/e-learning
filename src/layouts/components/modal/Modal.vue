<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.backdrop {
  z-index: 99999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(20, 20, 20, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.backdrop .modal {
  background-color: white;
  width: 400px;
  max-height: 90vh;
  color: #333;
  border-radius: 10px;
  padding: 25px 40px;
  overflow: auto;
}

.modal {
  max-height: 250px;
  padding: 1rem;
  overflow-y: auto;
  direction: ltr;
  scrollbar-color: #5372c7 #e4e4e4;
  scrollbar-width: thin;
}

.modal::-webkit-scrollbar {
  width: 20px;
}

.modal::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  border-radius: 100px;
}

.modal::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
}
</style>
