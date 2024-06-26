<template>
  <div class="elprisapp-tabell-meny">
    <div class="meny-title-text">Visa pris</div>
    <a
      href="#app"
      @click="handleDagens"
      :class="[
        visaPris === 1
          ? 'elpriser-tab chosen w-button'
          : 'elpriser-tab w-button',
      ]"
      >Dagens</a
    >
    <a
      href="#app"
      @click="handleMorgondagens"
      :class="[
        visaPris === 2
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
  name: "PriceSelector",

  props: {
    date: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      visaPris: 0,
    };
  },

  methods: {
    getDateString(date) {
      if (date === null) return;

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },

    handleDagens() {
      this.$emit("date", this.getDateString(new Date()));
    },

    handleMorgondagens() {
      this.$emit(
        "date",
        this.getDateString(
          new Date(new Date().setDate(new Date().getDate() + 1)),
        ),
      );
    },
  },

  watch: {
    date() {
      const todaysDate = this.getDateString(new Date());
      const tomorrowsDate = this.getDateString(
        new Date(new Date().setDate(new Date().getDate() + 1)),
      );

      if (this.date === todaysDate) {
        this.visaPris = 1;
      } else if (this.date === tomorrowsDate) {
        this.visaPris = 2;
      } else {
        this.visaPris = 0;
      }
    },
  },
};
</script>

<style scoped>
@import "../css/normalize.css";
@import "../css/components.css";
@import "../css/elprisappen.css";
</style>
