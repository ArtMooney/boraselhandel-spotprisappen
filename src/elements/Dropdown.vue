<template>
  <select
    :name="name"
    :data-name="name"
    v-model="selectedValue"
    class="custom-select input h-12 w-full bg-white border-1 border-solid border-[#8d8d8d] rounded mb-0 px-3 py-1 focus:outline-none"
  >
    <option
      v-for="option in optionsList"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Dropdown",

  props: {
    name: {
      type: String,
      required: true,
    },
    optionsList: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selectedValue: this.modelValue,
    };
  },

  watch: {
    modelValue(newValue) {
      this.selectedValue = newValue;
    },
  },
};
</script>

<style>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
