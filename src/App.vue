<script setup>
import Selectors from "./components/Selectors.vue";
import WorkspaceSelector from "./components/WorkspaceSelector.vue";
import Table from "./components/Table.vue";
import Graph from "./components/Graph.vue";
import PriceSelector from "./components/PriceSelector.vue";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import loadAnim from "./documents/77076-loading.json";
</script>

<template>
  <div elpriser-app="true" class="elprisapp">
    <div class="elprisapp-wrapper w-form">
      <Selectors
        :date="selectDate"
        @area="handleSelectArea"
        @period="handleSelectPeriod"
        @date="handleSelectDate"
        @compare="handleSelectCompare"
      />

      <div v-bind:style="{ display: messageBox }" class="message-box">
        <div>{{ statusMessage }}</div>
      </div>

      <WorkspaceSelector :tab="selectedTab" @input="handleSelectTab" />

      <div v-show="!loader" class="elprisapp-tabs">
        <div v-show="selectedTab === 0">
          <Table :prices="prices" :area="selectArea" />
        </div>
        <div v-show="selectedTab === 1">
          <Graph
            :prices="prices"
            :comparePrices="comparePrices"
            :area="selectArea"
            :compare="selectCompare"
          />
        </div>

        <PriceSelector :date="selectDate" @date="handleSelectDate" />
      </div>
    </div>

    <div v-if="loader" class="loader-overlay">
      <Vue3Lottie :animationData="loadAnim" :height="200" :width="200" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Spotprisappen",

  data() {
    return {
      pricesWebhook: "https://boraselhandel.framecore.se/prices?date=",
      apiKey: "PeKnqf7kFD2ejLYvv63a",
      prices: [],
      comparePrices: [],
      missingPricesMessage:
        "Prisuppskattningen för morgondagens priser är tillgängliga varje dag från runt kl. 13.00.",
      selectedTab: 0,
      loadAnim,
      loader: true,
      selectArea: "3",
      selectPeriod: "1",
      selectDate: "",
      selectCompare: "1",
      messageBox: "none",
      statusMessage: "-",
    };
  },

  async created() {
    this.prices = await this.getPrices(this.getDateString(new Date()));
    this.loader = false;
  },

  methods: {
    async getPrices(date) {
      if (isNaN(Date.parse(date))) return; // make sure date is valid

      const res = await fetch(this.pricesWebhook + date, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.apiKey,
        },
      });

      const prices = await res.json();

      if (prices && prices[0] && prices[0].status === "Missing") {
        this.statusMessage = this.missingPricesMessage;
        this.messageBox = "flex";
      } else {
        this.statusMessage = "-";
        this.messageBox = "none";
      }

      return prices;
    },

    getDateString(date) {
      if (date === null) return;

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },

    handleSelectTab(input) {
      this.selectedTab = input;
    },

    handleSelectArea(area) {
      this.selectArea = area;
    },

    handleSelectPeriod(period) {
      this.selectPeriod = period;
    },

    handleSelectDate(date) {
      if (date !== null && date !== "Invalid Date") {
        this.selectDate = date;
      }
    },

    async handleSelectCompare(compare) {
      this.selectedTab = 1;

      if (compare === "2") {
        this.comparePrices = await this.getPrices(
          this.getDateString(
            new Date(new Date().setDate(new Date().getDate() - 1)),
          ),
        );
      } else if (compare === "3") {
        this.comparePrices = await this.getPrices(
          this.getDateString(
            new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          ),
        );
      }

      this.selectCompare = compare;
    },
  },

  watch: {
    async selectDate() {
      this.prices = await this.getPrices(this.selectDate);
    },
  },
};
</script>

<style scoped>
@import "./css/normalize.css";
@import "./css/components.css";
@import "./css/elprisappen.css";
</style>
