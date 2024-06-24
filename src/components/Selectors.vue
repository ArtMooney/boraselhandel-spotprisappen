<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Dropdown from "../elements/Dropdown.vue";
</script>

<template>
  <div class="elprisapp-topmenu">
    <div class="elpris-input-wrapper">
      <div>Välj elområde</div>
      <Dropdown
        name="elomrade"
        default-value="3"
        :options-list="[
          { value: 1, label: '1 - Norra Sverige' },
          { value: 2, label: '2 - Norra Mellansverige' },
          { value: 3, label: '3 - Södra Mellansverige' },
          { value: 4, label: '4 - Södra Sverige' },
        ]"
        @input="handleSelectArea"
      />
    </div>

    <div class="elpris-input-wrapper">
      <div>Välj period</div>
      <Dropdown
        name="period"
        default-value="1"
        :options-list="[
          { value: 1, label: 'En dag (per timme)' },
          { value: 2, label: 'En dag framåt (per timme)' },
        ]"
        @input="handleSelectPeriod"
      />
    </div>

    <div class="elpris-input-wrapper">
      <div>Välj startdatum</div>
      <div class="datepicker-wrapper w-embed">
        <VueDatePicker
          v-model="selectDate"
          :format="'yyyy-MM-dd'"
          locale="sv"
          auto-apply=""
          :min-date="'2014-01-01'"
          :max-date="new Date()"
          input-class-name="dp-custom-input"
        >
        </VueDatePicker>
      </div>
    </div>

    <div class="elpris-input-wrapper">
      <div>Jämför med</div>
      <Dropdown
        name="jamfor"
        default-value="1"
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

  emits: ["area", "period", "date", "compare"],

  data() {
    return {
      selectArea: "",
      selectPeriod: "",
      selectDate: new Date(),
      selectCompare: "",
    };
  },

  methods: {
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
      this.$emit("date", this.selectDate);
    },

    selectCompare() {
      this.$emit("compare", this.selectCompare);
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
  font-family:
    Strawford Light Webfont,
    sans-serif;
  font-weight: 300;
  font-size: 0.87rem;
  padding-top: 0.55rem;
  height: 2.9rem;
}
</style>
