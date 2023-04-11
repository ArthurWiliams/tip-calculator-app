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
        <span class="text-3xl md:text-4xl text-cyan-500"> ${{ AMOUNT }} </span>
      </p>
      <p class="flex justify-between items-center">
        <span>
          Total
          <span class="block text-xs text-cyan-400">
            <span aria-label="per">/</span> person
          </span>
        </span>
        <span class="text-3xl md:text-4xl text-cyan-500"> ${{ TOTAL }} </span>
      </p>
    </div>

    <button
      class="block rounded-md p-2 text-center opacity-25 cursor-not-allowed uppercase w-full bg-cyan-500 text-cyan-900"
      :class="{ 'opacity-100 cursor-default': anyHasValue }"
      type="reset"
    >
      reset
    </button>
  </div>
</template>
