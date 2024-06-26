<template>
  <select
    :name="name"
    :data-name="name"
    v-model="selectedValue"
    class="custom-select input border-1 mb-0 h-12 w-full rounded border-solid border-[#8d8d8d] bg-white px-3 py-1 text-base font-normal focus:outline-none"
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
