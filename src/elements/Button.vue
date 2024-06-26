<template>
  <button
    @click="handleClick"
    :class="[
      modeSelected
        ? 'm-2 min-w-36 rounded-xl border-4 border-dotted border-[#57a3af] border-transparent bg-[#f29091] p-2.5 font-straw_bold text-lg text-white transition-all duration-200 hover:border-white/50 sm:min-w-48'
        : 'm-2 min-w-36 rounded-xl border-4 border-dotted border-[#57a3af] bg-transparent p-2.5 font-straw_bold text-lg transition-all duration-200 hover:bg-[#f29091]/25 sm:min-w-48',
    ]"
    style=""
  >
    {{ text }}
  </button>
</template>

<!--background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='7' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");-->

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
