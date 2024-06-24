<template>
  <select
    :name="name"
    :data-name="name"
    v-model="selectInput"
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
    defaultValue: {
      type: String,
      required: true,
    },
    optionsList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      selectInput: this.defaultValue,
    };
  },
};
</script>
