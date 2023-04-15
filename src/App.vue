<script setup lang="ts">
import { reactive, computed } from "vue";

import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import Output from "./components/Output.vue";

import dollarIcon from "./assets/icon-dollar.svg";
import personIcon from "./assets/icon-person.svg";

import { IInputProps } from "./interfaces";

// Validators to use in the validation of the fields
import {
  hasLetter,
  hasWhitespace,
  hasSymbol,
  isDecimal,
  hasLeadingZero,
  isZero,
  isEmpty,
} from "./validators";

const VALUES = reactive({
  bill: "",
  tipPercentage: "",
  numberOfPeople: "",
});

const ERRORS = reactive({
  bill: false,
  tipPercentage: false,
  numberOfPeople: false,
});

const ANY_HAS_VALUE = computed(() =>
  Object.values(VALUES).some((value) => !isEmpty(value))
);

const ANY_ARE_EMPTY = computed(() =>
  Object.values(VALUES).some((value) => isEmpty(value))
);

const ANY_HAS_ERROR = computed(() =>
  Object.values(ERRORS).some((value) => value === true)
);

// Bill field settings
const BILL_PROPS: IInputProps = {
  label: "Bill",
  name: "bill",
  id: "bill",
  inputMode: "decimal",
  placeholder: "0",
  visibility: {
    label: true,
    error: true,
  },
  icon: dollarIcon,
  validator(value) {
    if (hasWhitespace(value)) return "Can't have whitespace";
    if (isZero(value)) return "Can't be zero";
    if (hasLetter(value)) return "Can't have letters";
    if (hasLeadingZero(value)) return "Can't have leading zero";
    if (!isDecimal(value) && hasSymbol(value)) return "Can't have symbol";

    return null;
  },
};

// Number of people field settings
const NUMBER_OF_PEOPLE_PROPS: IInputProps = {
  label: "Number of People",
  name: "numberOfPeople",
  id: "numberOfPeople",
  inputMode: "numeric",
  placeholder: "0",
  icon: personIcon,
  visibility: {
    label: true,
    error: true,
  },
  validator(value) {
    if (hasWhitespace(value)) return "Can't have whitespace";
    if (isZero(value)) return "Can't be zero";
    if (hasLetter(value)) return "Can't have letters";
    if (hasLeadingZero(value)) return "Can't have leading zero";
    if (isDecimal(value)) return "Can't be decimal";
    if (hasSymbol(value)) return "Can't have symbol";

    return null;
  },
};

const OPTIONS = [
  {
    label: "5%",
    value: "5",
  },
  {
    label: "10%",
    value: "10",
  },
  {
    label: "15%",
    value: "15",
  },
  {
    label: "25%",
    value: "25",
  },
  {
    label: "50%",
    value: "50",
  },
];

function reset() {
  VALUES.bill = "";
  VALUES.tipPercentage = "";
  VALUES.numberOfPeople = "";

  ERRORS.bill = false;
  ERRORS.tipPercentage = false;
  ERRORS.numberOfPeople = false;
}
</script>

<template>
  <h1 class="sr-only">Tip Calculator</h1>

  <img src="./assets/logo.svg" alt="logo" class="mx-auto my-10 md:mb-14" />

  <form
    class="gap-9 md:gap-10 bg-white rounded-t-3xl p-8 md:p-10 max-w-4xl m-auto font-mono grid md:rounded-b-3xl md:grid-cols-2 md:shadow-xl"
    @reset="reset"
  >
    <div class="space-y-8 md:space-y-10">
      <Input
        v-bind="BILL_PROPS"
        v-model="VALUES.bill"
        v-model:error="ERRORS.bill"
      />

      <Select
        name="percentage"
        v-model:error="ERRORS.tipPercentage"
        v-model="VALUES.tipPercentage"
        :options="OPTIONS"
      />

      <Input
        v-bind="NUMBER_OF_PEOPLE_PROPS"
        v-model="VALUES.numberOfPeople"
        v-model:error="ERRORS.numberOfPeople"
      />
    </div>

    <div>
      <Output
        class="-mx-2 md:mx-0"
        :bill="VALUES.bill"
        :tip-percentage="VALUES.tipPercentage"
        :number-of-people="VALUES.numberOfPeople"
        :any-has-error="ANY_HAS_ERROR"
        :any-has-value="ANY_HAS_VALUE"
        :any-are-empty="ANY_ARE_EMPTY"
      />
    </div>
  </form>
</template>
