<template>
  <div
    class="grid-rows-auto mb-8 grid auto-cols-fr grid-cols-2 gap-0 bg-white"
    style="border-top: 1px solid #8d8d8d"
  >
    <div
      class="flex items-center justify-center p-2"
      style="border: 1px solid #8d8d8d; border-top-width: 0"
    >
      <div class="font-straw_bold font-bold">Tidsperiod</div>
    </div>
    <div
      class="flex items-center justify-center p-2"
      style="
        border: 1px solid #8d8d8d;
        border-top-width: 0;
        border-left-width: 0;
      "
    >
      <div class="font-straw_bold font-bold">
        {{ formattedHeadingDate }}
        Snittpris (öre/kWh)
      </div>
    </div>

    <template v-for="(label, index) of tableLabels" :key="label + '-' + index">
      <div
        class="flex items-center justify-center p-2"
        style="border: 1px solid #8d8d8d; border-top-width: 0"
      >
        <div>{{ label }}</div>
      </div>
      <div
        class="flex items-center justify-center p-2"
        style="
          border: 1px solid #8d8d8d;
          border-top-width: 0;
          border-left-width: 0;
        "
      >
        <div>{{ formattedPrices[index] }}</div>
      </div>
    </template>
  </div>

  <div
    class="grid-rows-auto mb-8 grid auto-cols-fr grid-cols-2 gap-0 bg-white"
    style="border-top: 1px solid #8d8d8d"
  >
    <div
      class="flex items-center justify-center p-2"
      style="border: 1px solid #8d8d8d; border-top-width: 0"
    >
      <div>Medelpris</div>
    </div>
    <div
      class="flex items-center justify-center p-2"
      style="
        border: 1px solid #8d8d8d;
        border-top-width: 0;
        border-left-width: 0;
      "
    >
      <div>{{ formattedAveragePrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",

  props: {
    prices: {
      type: Array,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      tableLabels: [
        "00 - 01",
        "01 - 02",
        "02 - 03",
        "03 - 04",
        "04 - 05",
        "05 - 06",
        "06 - 07",
        "07 - 08",
        "08 - 09",
        "09 - 10",
        "10 - 11",
        "11 - 12",
        "12 - 13",
        "13 - 14",
        "14 - 15",
        "15 - 16",
        "16 - 17",
        "17 - 18",
        "18 - 19",
        "19 - 20",
        "20 - 21",
        "21 - 22",
        "22 - 23",
        "23 - 00",
      ],
    };
  },

  computed: {
    areaIndex() {
      return parseInt(this.area) - 1;
    },

    currentPrices() {
      return this.prices[this.areaIndex] || {};
    },

    formattedHeadingDate() {
      const date = this.currentPrices.deliveryDateCET;
      return date ? this.formatHeadingDate(date) : "";
    },

    formattedPrices() {
      const prices = this.currentPrices.prices || [];
      return prices.map((priceObj) =>
        priceObj.price
          ? (parseFloat(priceObj.price) / 10).toFixed(2).toString()
          : "0",
      );
    },

    formattedAveragePrice() {
      const price = this.currentPrices.averagePrice;
      return price ? (parseFloat(price) / 10).toFixed(2).toString() : "";
    },
  },

  methods: {
    formatHeadingDate(date) {
      return new Date(date)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(",", "");
    },
  },
};
</script>
