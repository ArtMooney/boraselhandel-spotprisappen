<template>
  <div class="elprisapp-tabell-meny">
    <div class="meny-title-text">Visa pris</div>
    <a
      href="#app"
      @click="handleDagens"
      :class="[
        visaPris === 0
          ? 'elpriser-tab chosen w-button'
          : 'elpriser-tab w-button',
      ]"
      >Dagens</a
    >
    <a
      href="#app"
      @click="handleMorgondagens"
      :class="[
        visaPris === 1
          ? 'elpriser-tab chosen w-button'
          : 'elpriser-tab w-button',
      ]"
      class="elpriser-tab w-button"
      >Morgondagens<br
    /></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visaPris: 0,
    };
  },

  methods: {
    handleDagens() {
      this.selectPeriod = "1";
      this.visaPris = 0;
    },

    handleMorgondagens() {
      this.selectPeriod = "2";
      this.visaPris = 1;
    },
  },
};
</script>

<style scoped>
@import "../css/normalize.css";
@import "../css/components.css";
@import "../css/elprisappen.css";
</style>
