<template>
  <div class="graf-wrapper w-embed">
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script>
// import Chart from "chart.js/auto";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
);

export default {
  name: "Graph",

  props: {
    prices: {
      type: Array,
      required: true,
    },
    comparePrices: {
      type: Array,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    compare: {
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

      chartType: "line",
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: (context) => {
              const bgColor = [
                "rgba(246,95,95,0.3)",
                "rgba(236,193,64,0.3)",
                "rgba(155,228,126,0.3)",
              ];

              if (!context.chart.chartArea) {
                return;
              }

              const {
                ctx,
                data,
                chartArea: { top, bottom },
              } = context.chart;
              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
              const colorLayers = 1 / bgColor.length;

              for (let i = 0; i < bgColor.length; i++) {
                gradientBg.addColorStop(i * colorLayers, bgColor[i]);
              }

              return gradientBg;
            },
            borderColor: (context) => {
              const bgColor = [
                "rgba(246,95,95,1)",
                "rgba(236,193,64,1)",
                "rgba(155,228,126,1)",
              ];

              if (!context.chart.chartArea) {
                return;
              }

              const {
                ctx,
                data,
                chartArea: { top, bottom },
              } = context.chart;
              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
              const colorLayers = 1 / bgColor.length;

              for (let i = 0; i < bgColor.length; i++) {
                gradientBg.addColorStop(i * colorLayers, bgColor[i]);
              }

              return gradientBg;
            },
            data: [],
            stepped: true,
            fill: true,
          },
        ],
      },
      chartOptions: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            min: 0,
            display: true,
            title: {
              display: true,
              text: "öre/kWh",
            },
          },
        },
        animation: {
          duration: 0,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  (Math.round(context.parsed.y * 100) / 100).toFixed(2) +
                  " öre/kWh"
                );
              },
            },
          },
        },
        maintainAspectRatio: false,
      },

      addedLabel: " Snittpris (öre/kWh)",
    };
  },

  async mounted() {
    this.chartData.labels = this.tableLabels.map((label) =>
      label.replaceAll(" ", ""),
    );

    this.createChart();
  },

  computed: {
    areaIndex() {
      return parseInt(this.area) - 1;
    },
  },

  methods: {
    createChart() {
      const chart = new Chart(this.$refs.myChart, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions,
      });

      this.myChart = chart;
    },

    updateChart() {
      const chart = this.myChart;
      const area = parseInt(this.area) - 1;
      const mainDataset = this.chartData.datasets[0];
      const compareDataset = this.chartData.datasets[1];

      mainDataset.data = this.currentPrices(this.prices);
      mainDataset.label =
        this.formatHeadingDate(this.prices[area].deliveryDateCET) +
        this.addedLabel;

      if (parseInt(this.compare) > 1) {
        compareDataset.data = this.currentPrices(this.comparePrices);
        compareDataset.label =
          this.formatHeadingDate(this.comparePrices[area].deliveryDateCET) +
          this.addedLabel;
      }

      if (chart.data.datasets.length > 1) {
        compareDataset.data = this.currentPrices(this.comparePrices);
        compareDataset.label =
          this.formatHeadingDate(this.comparePrices[area].deliveryDateCET) +
          this.addedLabel;
      } else {
        if (this.comparePrices.length > 0) {
          this.chartData.datasets.push({
            label:
              this.formatHeadingDate(this.comparePrices[area].deliveryDateCET) +
              this.addedLabel,
            backgroundColor: "rgba(27, 110, 144, 0.3)",
            borderColor: "rgba(0, 0, 0, 0.3)",
            data: this.currentPrices(this.comparePrices),
            stepped: true,
            borderDash: [5, 5],
          });
        }
      }

      this.myChart.update();
    },

    removeDataset() {
      const chart = this.myChart;

      if (chart.data && chart.data.datasets.length > 1) {
        chart.data.datasets.pop();
      }
    },

    currentPrices(priceList) {
      let prices = [];

      for (const price of priceList[this.areaIndex].prices) {
        prices.push(
          price.price
            ? (parseFloat(price.price) / 10).toFixed(2).toString()
            : "",
        );
      }

      return prices;
    },

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

  watch: {
    prices() {
      console.log("PRICES", JSON.parse(JSON.stringify(this.prices)));
      this.updateChart();
    },

    comparePrices() {
      this.updateChart();
      this.removeDataset();
    },

    compare() {
      // console.log("COMPARE", this.compare);
      // if (this.compare === "1") {
      //   this.removeDataset();
      //   this.updateChart();
      // }
    },
  },
};
</script>

<style scoped>
@import "../css/normalize.css";
@import "../css/components.css";
@import "../css/elprisappen.css";

.elpris-input {
  -webkit-appearance: none;
}

input[type="input"]:focus {
  outline: none;
}

.gradient-wait {
  background: linear-gradient(-45deg, #eeeeee, #ffffff, #aaaaaa, #eeeeee);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
