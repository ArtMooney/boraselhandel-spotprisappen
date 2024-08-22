<script setup>
import Button from "../elements/Button.vue";
</script>

<template>
  <div class="mb-6 mt-10 flex flex-wrap items-center justify-center">
    <Button
      text="Tabell"
      :modeSelected="selectedTab === 0"
      @click="handleTabell"
    />
    <Button
      text="Graf"
      :modeSelected="selectedTab === 1"
      @click="handleGraph"
    />
  </div>
</template>

<script>
export default {
  name: "WorkspaceSelector",

  props: {
    tab: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selectedTab: 1,
    };
  },

  methods: {
    handleTabell() {
      this.selectedTab = 0;
      this.$emit("input", this.selectedTab);
    },

    handleGraph() {
      this.selectedTab = 1;
      this.$emit("input", this.selectedTab);
    },
  },

  watch: {
    tab() {
      this.selectedTab = this.tab;
    },
  },
};
</script>
