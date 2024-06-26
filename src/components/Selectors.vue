<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Dropdown from "../elements/Dropdown.vue";
</script>

<template>
  <div
    class="grid gap-4 grid-rows-auto grid-cols-1 auto-cols-fr items-center relative sm:grid-cols-2 lg:grid-cols-4"
  >
    <div>
      <div>Välj elområde</div>
      <Dropdown
        name="elomrade"
        v-model="selectArea"
        :options-list="[
          { value: 1, label: '1 - Norra Sverige' },
          { value: 2, label: '2 - Norra Mellansverige' },
          { value: 3, label: '3 - Södra Mellansverige' },
          { value: 4, label: '4 - Södra Sverige' },
        ]"
        @input="handleSelectArea"
      />
    </div>

    <div>
      <div>Välj period</div>
      <Dropdown
        name="period"
        v-model="selectPeriod"
        :options-list="[
          { value: 1, label: 'En dag (per timme)' },
          { value: 2, label: 'En dag framåt (per timme)' },
        ]"
        @input="handleSelectPeriod"
      />
    </div>

    <div>
      <div>Välj startdatum</div>
      <div class="datepicker-wrapper w-embed">
        <VueDatePicker
          v-model="selectDate"
          :format="'yyyy-MM-dd'"
          locale="sv"
          auto-apply=""
          :min-date="'2014-01-01'"
          :max-date="new Date()"
          input-class-name="h-12 w-full border-1 border-solid border-[#8d8d8d] rounded mb-0 py-1 text-base"
        >
        </VueDatePicker>
      </div>
    </div>

    <div>
      <div>Jämför med</div>
      <Dropdown
        name="jamfor"
        v-model="selectCompare"
        :options-list="[
          { value: 1, label: 'Inget' },
          { value: 2, label: 'Föregående dag' },
          { value: 3, label: 'Samma dag föregående år' },
        ]"
        @input="handleSelectCompare"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Selectors",

  props: {
    date: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      selectArea: "3",
      selectPeriod: "1",
      selectDate: new Date(),
      selectCompare: "1",
    };
  },

  methods: {
    getDateString(date) {
      if (date === null) return;

      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      return `${year}-${month}-${day}`;
    },

    handleSelectArea(selectInput) {
      this.selectArea = selectInput.target.value;
    },

    handleSelectPeriod(selectInput) {
      this.selectPeriod = selectInput.target.value;
      if (this.selectPeriod === "1") {
        this.selectDate = new Date();
      } else if (this.selectPeriod === "2") {
        this.selectDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
    },

    handleSelectCompare(selectInput) {
      this.selectCompare = selectInput.target.value;
    },
  },

  watch: {
    selectArea() {
      this.$emit("area", this.selectArea);
    },

    selectPeriod() {
      this.$emit("period", this.selectPeriod);
    },

    selectDate() {
      if (
        this.getDateString(new Date()) !==
          this.getDateString(this.selectDate) &&
        this.selectCompare !== "1"
      ) {
        this.$nextTick(() => {
          this.selectCompare = "1";
        });
      }

      this.$emit("date", this.getDateString(this.selectDate));
    },

    selectCompare() {
      if (this.selectCompare !== "1") {
        this.selectPeriod = "1";
        this.selectDate = new Date();
      }

      this.$emit("compare", this.selectCompare);
    },

    date() {
      this.selectDate = new Date(this.date);
    },
  },
};
</script>
