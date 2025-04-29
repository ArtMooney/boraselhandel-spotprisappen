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
    span: {
      type: String,
      required: true,
    },
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

    tableLabels() {
      const labels = [];
      let from = 0;
      let to = 1;

      if (this.span === "1") {
        for (let i = 0; i < this.currentPrices?.prices?.length; i++) {
          labels.push(
            from.toString().padStart(2, "0") +
              " - " +
              to.toString().padStart(2, "0"),
          );
          from++;
          to++;
        }
      }

      return labels;
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
