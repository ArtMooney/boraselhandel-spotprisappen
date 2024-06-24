<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
);

export default {
  name: "BarChart",

  components: { Line },

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
      chartData: {
        labels: [
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
        datasets: [
          {
            label: this.area,
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
            stepped: true,
            fill: true,
          },
          {
            label: this.compare,
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
            stepped: true,
            borderDash: [5, 5],
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

  computed: {
    areaIndex() {
      return parseInt(this.area) - 1;
    },
  },

  mounted() {
    this.updateChartData();
  },

  methods: {
    currentPrices(priceList) {
      let prices = [];

      for (const price of priceList[this.areaIndex].prices) {
        prices.push(
          price.price
            ? parseFloat((parseFloat(price.price) / 10).toFixed(2))
            : null,
        );
      }

      return prices;
    },

    updateChartData() {
      if (this.compare === "1") {
        // only one dataset
        this.chartData = {
          ...this.chartData,
          datasets: [
            {
              ...this.chartData.datasets[0],
              label:
                this.prices.length > 0
                  ? this.formatHeadingDate(
                      this.prices[this.areaIndex].deliveryDateCET,
                    ) + this.addedLabel
                  : "",
              data:
                this.prices.length > 0 ? this.currentPrices(this.prices) : [],
            },
          ],
        };
      } else {
        // two datasets
        this.chartData = {
          ...this.chartData,
          datasets: [
            {
              ...this.chartData.datasets[0],
              label:
                this.prices.length > 0
                  ? this.formatHeadingDate(
                      this.prices[this.areaIndex].deliveryDateCET,
                    ) + this.addedLabel
                  : "",
              data:
                this.prices.length > 0 ? this.currentPrices(this.prices) : [],
            },
            {
              ...this.chartData.datasets[1],
              label:
                this.comparePrices.length > 0
                  ? this.formatHeadingDate(
                      this.comparePrices[this.areaIndex].deliveryDateCET,
                    ) + this.addedLabel
                  : "",
              data:
                this.comparePrices.length > 0
                  ? this.currentPrices(this.comparePrices)
                  : [],
            },
          ],
        };
      }
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
      console.log(JSON.parse(JSON.stringify(this.prices)));
      this.updateChartData();
    },

    comparePrices() {
      this.updateChartData();
    },

    area() {
      this.updateChartData();
    },

    compare() {
      this.updateChartData();
    },
  },
};
</script>
