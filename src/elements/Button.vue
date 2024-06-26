<template>
  <button
    @click="handleClick"
    :class="[
      modeSelected
        ? 'm-2 min-w-36 rounded-xl border-4 border-dashed border-[#57a3af] border-transparent bg-[#f29091] p-2.5 font-straw_bold text-lg text-white transition-transform duration-200 sm:min-w-48'
        : 'm-2 min-w-36 rounded-xl border-4 border-dashed border-[#57a3af] bg-transparent p-2.5 font-straw_bold text-lg transition-transform duration-200 sm:min-w-48',
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
