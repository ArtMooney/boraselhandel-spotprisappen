<template>
  <select
    :name="name"
    :data-name="name"
    v-model="selectedValue"
    class="elpris-input w-select"
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
