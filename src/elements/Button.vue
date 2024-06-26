<template>
  <button
    @click="handleClick"
    :class="[
      modeSelected
        ? 'min-w-36 sm:min-w-48 bg-transparent border-4 border-dashed border-[#57a3af] rounded-xl m-2 p-2.5 font-straw_bold text-lg transition-transform duration-200 text-white bg-[#f29091] border-transparent'
        : 'min-w-36 sm:min-w-48 bg-transparent border-4 border-dashed border-[#57a3af] rounded-xl m-2 p-2.5 font-straw_bold text-lg transition-transform duration-200',
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
