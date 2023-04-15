<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  bill: string;
  tipPercentage: string;
  numberOfPeople: string;
  anyHasError: boolean;
  anyHasValue: boolean;
  anyAreEmpty: boolean;
}>();

const AMOUNT = computed(() => {
  if (props.anyHasError || props.anyAreEmpty) return "0.00";

  const BILL = parseFloat(props.bill);
  const TIP_PERCENTAGE = parseFloat(props.tipPercentage);
  const NUMBER_OF_PEOPLE = parseFloat(props.numberOfPeople);

  return ((BILL * (TIP_PERCENTAGE / 100)) / NUMBER_OF_PEOPLE).toFixed(2);
});

const TOTAL = computed(() => {
  if (props.anyHasError || props.anyAreEmpty) return "0.00";

  const BILL = parseFloat(props.bill);
  const TIP_PERCENTAGE = parseFloat(props.tipPercentage);
  const NUMBER_OF_PEOPLE = parseFloat(props.numberOfPeople);
  const TIP = BILL * (TIP_PERCENTAGE / 100);

  return ((BILL + TIP) / NUMBER_OF_PEOPLE).toFixed(2);
});

const BUTTON_TOGGLE = computed(() => ({
  "cursor-pointer opacity-100 active:bg-cyan-300 hover:bg-cyan-300":
    props.anyHasValue,
  "cursor-not-allowed opacity-25": !props.anyHasValue,
}));
</script>

<template>
  <div
    class="p-6 pt-8 md:p-8 md:pt-12 md:flex md:flex-col md:justify-between space-y-7 rounded-xl bg-cyan-900 md:h-full"
  >
    <div class="text-white space-y-6 md:space-y-11 text-sm md:grid-rows-3">
      <p class="flex justify-between items-center">
        <span>
          Tip Amount
          <span class="block text-xs text-cyan-400">
            <span aria-label="per">/</span> person
          </span>
        </span>
        <span class="text-3xl md:text-5xl text-cyan-500"> ${{ AMOUNT }} </span>
      </p>
      <p class="flex justify-between items-center">
        <span>
          Total
          <span class="block text-xs text-cyan-400">
            <span aria-label="per">/</span> person
          </span>
        </span>
        <span class="text-3xl md:text-5xl text-cyan-500"> ${{ TOTAL }} </span>
      </p>
    </div>

    <button
      class="block rounded-md p-2 text-center uppercase w-full bg-cyan-500 text-cyan-900"
      :class="BUTTON_TOGGLE"
      type="reset"
    >
      reset
    </button>
  </div>
</template>
