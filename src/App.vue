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
  <div
    class="relative w-full bg-[#fff0dd] font-straw_light text-base font-normal leading-7 text-black"
  >
    <div class="mb-0 p-4 md:p-8">
      <Selectors
        :date="selectDate"
        @area="handleSelectArea"
        @period="handleSelectPeriod"
        @date="handleSelectDate"
        @compare="handleSelectCompare"
        @span="handleSelectSpan"
      />

      <div
        :style="{ display: messageBox }"
        class="mb-4 mt-4 items-center justify-start bg-[#fcc] p-2"
      >
        <div>{{ statusMessage }}</div>
      </div>

      <WorkspaceSelector :tab="selectedTab" @input="handleSelectTab" />

      <div v-show="!loader" class="items-center justify-center">
        <div v-show="selectedTab === 0">
          <Table :prices="prices" :area="selectArea" :span="selectSpan" />
        </div>
        <div
          v-show="selectedTab === 1"
          class="h-[30rem] min-h-[30rem] lg:h-[50rem] lg:min-h-[50rem]"
        >
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

    <div
      v-if="loader"
      class="absolute bottom-0 left-0 right-0 top-0 flex items-center"
    >
      <Vue3Lottie :animationData="loadAnim" :height="200" :width="200" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Spotprisappen",

  data() {
    return {
      pricesWebhook: "https://boraselhandel.framecore.se/price-indicies?date=",
      apiKey: "PeKnqf7kFD2ejLYvv63a",
      prices: [],
      comparePrices: [],
      missingPricesMessage:
        "Prisuppskattningen för morgondagens priser är tillgängliga varje dag från runt kl. 13.00.",
      selectedTab: 1,
      loadAnim,
      loader: true,
      selectArea: "3",
      selectPeriod: "1",
      selectDate: "",
      selectCompare: "1",
      selectSpan: "0",
      messageBox: "none",
      statusMessage: "-",
    };
  },

  async created() {
    this.prices = await this.getPrices(
      this.getDateString(new Date()),
      this.selectSpan,
    );
    this.loader = false;
  },

  methods: {
    async getPrices(date, span) {
      if (isNaN(Date.parse(date))) return; // make sure date is valid

      const res = await fetch(this.pricesWebhook + date + "&span=" + span, {
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
          this.selectSpan,
        );
      } else if (compare === "3") {
        this.comparePrices = await this.getPrices(
          this.getDateString(
            new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
          ),
          this.selectSpan,
        );
      }

      this.selectCompare = compare;
    },

    handleSelectSpan(span) {
      this.selectSpan = span;
    },
  },

  watch: {
    async selectDate() {
      this.prices = await this.getPrices(this.selectDate, this.selectSpan);
    },

    async selectSpan() {
      this.prices = await this.getPrices(
        this.selectDate ? this.selectDate : this.getDateString(new Date()),
        this.selectSpan,
      );
    },
  },
};
</script>
