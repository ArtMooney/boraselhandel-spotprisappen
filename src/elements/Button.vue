<template>
  <button
    @click="handleClick"
    :class="[
      modeSelected ? 'elpriser-tab chosen w-button' : 'elpriser-tab w-button',
    ]"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Dropdown",

  props: {
    text: {
      type: String,
      required: true,
    },
    modeSelected: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    handleClick() {
      window.location.href = "#app";
    },
  },
};
</script>
