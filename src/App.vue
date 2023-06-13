<style scoped>
@import "./css/normalize.css";
@import "./css/components.css";
@import "./css/boras-elhandel.css";

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

<style lang="scss">
.dp-custom-input {
  margin-bottom: 0px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: hsla(0, 0%, 55.33%, 1);
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: hsla(0, 0%, 55.33%, 1);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: hsla(0, 0%, 55.33%, 1);
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: hsla(0, 0%, 55.33%, 1);
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  background-color: hsla(0, 0%, 100%, 1);
  font-family: Avenirltstd;
  font-size: 0.87rem;
  padding-top: 0.55rem;
  height: 2.9rem;
}
</style>

<template>
  <div elpriser-app="true" class="elprisapp">
    <div class="elprisapp-wrapper w-form">
      <div class="elprisapp-topmenu">
        <div class="elpris-input-wrapper">
          <div>Välj elområde</div>
          <select
            name="elomrade"
            data-name="elomrade"
            v-model="selectArea"
            class="elpris-input w-select"
          >
            <option value="1">1 - Norra Sverige</option>
            <option value="2">2 - Norra Mellansverige</option>
            <option value="3">3 - Södra Mellansverige</option>
            <option value="4">4 - Södra Sverige</option>
          </select>
        </div>
        <div class="elpris-input-wrapper">
          <div>Välj period</div>
          <select
            name="period"
            data-name="period"
            v-model="selectPeriod"
            class="elpris-input w-select"
          >
            <option value="1">En dag (per timme)</option>
            <option value="2">En dag framåt (per timme)</option>
          </select>
        </div>
        <div class="elpris-input-wrapper">
          <div>Välj startdatum</div>
          <div class="datepicker-wrapper w-embed">
            <datepicker
              v-model="selectDate"
              :format="'yyyy-MM-dd'"
              locale="sv"
              auto-apply=""
              :min-date="'2014-01-01'"
              :max-date="new Date()"
              input-class-name="dp-custom-input"
            >
            </datepicker>
          </div>
        </div>
        <div class="elpris-input-wrapper">
          <div>Jämför med</div>
          <select
            name="jamfor"
            data-name="jamfor"
            v-model="selectCompare"
            class="elpris-input w-select"
          >
            <option value="1">Inget</option>
            <option value="2">Föregående dag</option>
            <option value="3">Samma dag föregående år</option>
          </select>
        </div>
      </div>
      <div v-bind:style="{ display: messageBox }" class="message-box">
        <div>{{ statusMessage }}</div>
      </div>

      <div class="elprisapp-tabell-meny">
        <a
          @click="handleTabell"
          href="#"
          :class="[
            selectedTab === 0
              ? 'elpriser-tab chosen w-button'
              : 'elpriser-tab w-button',
          ]"
          >Tabell</a
        >
        <a
          @click="handleGraph"
          href="#"
          :class="[
            selectedTab === 1
              ? 'elpriser-tab chosen w-button'
              : 'elpriser-tab w-button',
          ]"
          >Graf</a
        >
      </div>
      <div v-show="!loader" class="elprisapp-tabs">
        <div v-show="selectedTab === 0">
          <div class="w-layout-grid elpris-grid">
            <div>
              <div class="elpris-column">
                <div class="elpriser-table-rubrik">Tidsperiod</div>
              </div>
              <div v-for="(label, index) of tableLabels" class="elpris-column">
                <div>{{ label }}</div>
              </div>
            </div>
            <div>
              <div class="elpris-column right">
                <div class="elpriser-table-rubrik">{{ tableHeading }}</div>
              </div>
              <div
                v-for="(price, index) in priceList"
                class="elpris-column right"
              >
                <div>{{ price }}</div>
              </div>
            </div>
          </div>
          <div class="w-layout-grid elpris-grid">
            <div class="elpris-column">
              <div>Medelpris</div>
            </div>
            <div class="elpris-column right">
              <div>{{ averagePrice }}</div>
            </div>
          </div>
        </div>
        <div v-show="selectedTab === 1">
          <div class="graf-wrapper w-embed">
            <canvas ref="myChart"></canvas>
          </div>
        </div>
        <div class="elprisapp-tabell-meny">
          <div class="meny-title-text">Visa pris</div>
          <a
            href="#"
            @click="handleDagens"
            :class="[
              visaPris === 0
                ? 'elpriser-tab chosen w-button'
                : 'elpriser-tab w-button',
            ]"
            >Dagens</a
          >
          <a
            href="#"
            @click="handleMorgondagens"
            :class="[
              visaPris === 1
                ? 'elpriser-tab chosen w-button'
                : 'elpriser-tab w-button',
            ]"
            class="elpriser-tab w-button"
            >Morgondagens<br
          /></a>
        </div>
      </div>
    </div>
    <div v-if="loader" class="loader-overlay">
      <Vue3Lottie :animationData="loadAnim" :height="200" :width="200" />
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Chart from "chart.js/auto";
// import {
//   Chart,
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Filler,
// } from "chart.js";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import loadAnim from "./documents/77076-loading.json";

// Chart.register(
//   LineController,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Filler
// );

export default {
  components: { Datepicker: VueDatePicker, Vue3Lottie },
  data() {
    return {
      pricesWebhook: "https://api.ngine.se/webhook/elhandel-priser?searchdate=",
      tableHeading: "-",
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

      priceList: [],
      priceData: [],
      averagePrice: "-",
      selectArea: "3",
      selectPeriod: "1",
      selectDate: new Date(),
      selectCompare: "1",
      messageBox: "none",
      statusMessage: "-",
      addedLabel: " Snittpris (öre/kWh)",
      graph: "graph",
      selectedTab: 0,
      loadAnim,
      loader: true,
      gradientBg: null,
      visaPris: 0,
    };
  },

  async mounted() {
    const date = new Date();
    this.getPrices(date);
    this.chartData.labels = this.tableLabels.map((label) =>
      label.replaceAll(" ", "")
    );
  },

  methods: {
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
    },

    async getPrices(date) {
      if (isNaN(Date.parse(date))) return; // make sure date is valid
      let priceData = this.priceData;

      this.loader = true;

      // avoid fetching the same prices
      if (!this.priceData[0]) {
        const res = await fetch(this.pricesWebhook + this.getDateString(date));
        priceData = await res.json();

        // create the chart
        this.createChart();
      } else {
        const datePart = this.priceData[0].json.searchdate.split(".");

        if (
          this.getDateString(date) !==
          `${datePart[2]}-${datePart[1]}-${datePart[0]}`
        ) {
          const res = await fetch(
            this.pricesWebhook + this.getDateString(date)
          );
          priceData = await res.json();
        }
      }

      // use price data to populate the app
      this.priceData = priceData;
      const area = parseInt(this.selectArea) - 1;

      if (this.selectPeriod === "2") {
        if (priceData[area].json.hourlytomorrow) {
          this.priceList = priceData[area].json.hourlytomorrow;
          this.tableHeading =
            priceData[area].json.datetomorrow + this.addedLabel;
          this.averagePrice = priceData[area].json.averagetomorrow;
        } else {
          this.statusMessage =
            "Prisuppskattningen för morgondagens priser är tillgängliga varje dag från runt kl. 13.00.";
          this.messageBox = "flex";
        }
      } else {
        this.statusMessage = "-";
        this.messageBox = "none";
        this.priceList = priceData[area].json.hourly;
        this.tableHeading = priceData[area].json.date + this.addedLabel;
        this.averagePrice = priceData[area].json.average;
      }

      this.updateChart();
      this.loader = false;
    },

    createChart() {
      const chart = new Chart(this.$refs.myChart, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions,
      });

      this.myChart = chart;
      // const ctx = this.$refs.myChart.getContext("2d");
      // this.gradientBg = ctx.createLinearGradient(0, 0, 0, 400);
      // this.gradientBg.addColorStop(0.5, "rgba(255, 0, 0, 1)");
      // this.gradientBg.addColorStop(0.5, "rgba(0, 0, 255, 1)");
    },

    updateChart() {
      const chart = this.myChart;
      const area = parseInt(this.selectArea) - 1;

      if (this.selectPeriod === "2") {
        this.chartData.datasets[0].data =
          this.priceData[area].json.hourlytomorrow;
        this.chartData.datasets[0].label =
          this.priceData[area].json.datetomorrow + this.addedLabel;
      } else {
        this.chartData.datasets[0].data = this.priceList;
        this.chartData.datasets[0].label = this.tableHeading;
      }

      if (this.selectCompare === "1") {
        this.removeDataset();
      } else if (this.selectCompare === "2") {
        if (this.chartData.datasets.length > 1) {
          this.chartData.datasets[1].data =
            this.priceData[area].json.hourlyyesterday;
          this.chartData.datasets[1].label =
            this.priceData[area].json.dateyesterday + this.addedLabel;
        } else {
          this.chartData.datasets.push({
            label: this.priceData[area].json.dateyesterday + this.addedLabel,
            backgroundColor: "rgb(27, 110, 144)",
            borderColor: "rgb(250, 222, 75)",
            data: this.priceData[area].json.hourlyyesterday,
          });
        }
      } else if (this.selectCompare === "3") {
        if (chart.data.datasets.length > 1) {
          this.chartData.datasets[1].data =
            this.priceData[area].json.hourlylastyear;
          this.chartData.datasets[1].label =
            this.priceData[area].json.datelastyear + this.addedLabel;
        } else {
          this.chartData.datasets.push({
            label: this.priceData[area].json.datelastyear + this.addedLabel,
            backgroundColor: "rgb(27, 110, 144)",
            borderColor: "rgb(250, 222, 75)",
            data: this.priceData[area].json.hourlylastyear,
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

    getDateString(date) {
      if (date === null) return;

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },

    handleTabell() {
      this.selectedTab = 0;
    },

    handleGraph() {
      this.selectedTab = 1;

      if (this.chartOptions.animation.duration === 0) {
        setTimeout(() => {
          this.chartOptions.animation.duration = 1000;
        }, 1000);
      }
    },

    handleDagens() {
      this.selectPeriod = "1";
      this.visaPris = 0;
    },

    handleMorgondagens() {
      this.selectPeriod = "2";
      this.visaPris = 1;
    },
  },

  watch: {
    selectArea(event) {
      this.getPrices(this.selectDate);
    },

    selectPeriod(event) {
      if (this.selectCompare === "1" || event === "2") {
        this.selectCompare = "1";
        this.removeDataset();

        if (event === "2") {
          this.selectDate = new Date();
        } else {
          this.getPrices(this.selectDate);
        }
      }
    },

    selectDate(date) {
      if (this.getDateString(date) !== this.getDateString(new Date())) {
        this.selectCompare = "1";
        this.removeDataset();
      }

      if (
        this.selectPeriod === "2" &&
        this.getDateString(date) !== this.getDateString(new Date())
      ) {
        this.selectPeriod = "1";
      }

      this.getPrices(date);
    },

    selectCompare(event) {
      this.handleGraph();

      if (event !== "1") {
        this.selectPeriod = "1";
        this.selectDate = new Date();
      } else {
        this.removeDataset();
        this.updateChart();
      }
    },
  },
};
</script>
