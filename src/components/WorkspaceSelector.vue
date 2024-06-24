<template>
  <div class="elprisapp-tabell-meny">
    <a
      @click="handleTabell"
      :class="[
        selectedTab === 0
          ? 'elpriser-tab chosen w-button'
          : 'elpriser-tab w-button',
      ]"
      >Tabell</a
    >
    <a
      @click="handleGraph"
      :class="[
        selectedTab === 1
          ? 'elpriser-tab chosen w-button'
          : 'elpriser-tab w-button',
      ]"
      >Graf</a
    >
  </div>
</template>

<script>
export default {
  name: "WorkspaceSelector",

  data() {
    return {
      selectedTab: 0,
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
};
</script>

<style scoped>
@import "../css/normalize.css";
@import "../css/components.css";
@import "../css/elprisappen.css";
</style>
