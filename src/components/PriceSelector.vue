<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div class="elprisapp-tabell-meny">
    <div class="meny-title-text">Visa pris</div>
    <Button text="Dagens" :modeSelected="chosen === 1" @click="handleDagens" />
    <Button
      text="Morgondagens"
      :modeSelected="chosen === 2"
      @click="handleMorgondagens"
    />
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
      chosen: 0,
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
        this.chosen = 1;
      } else if (this.date === tomorrowsDate) {
        this.chosen = 2;
      } else {
        this.chosen = 0;
      }
    },
  },
};
</script>
