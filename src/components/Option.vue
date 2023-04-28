<script setup lang="ts">
import { computed } from "vue";

import Counter from "../counter";

const props = defineProps<{
  modelValue?: string;
  label: string;
  value: string;
  name: string;
}>();

const OPTION_ID = "option-" + Counter.getCount();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const IS_SELECTED = computed(() => props.value === props.modelValue);

const SELECTED_STATE = computed(() => {
  return {
    "bg-cyan-500 text-cyan-900": IS_SELECTED.value,
    "text-white bg-cyan-900": !IS_SELECTED.value,
  };
});

function emit(event: Event) {
  emits("update:modelValue", (<HTMLInputElement>event.target).value);
}
</script>

<template>
  <input
    class="sr-only peer"
    type="radio"
    :name="name"
    :id="OPTION_ID"
    :value="value"
    :checked="IS_SELECTED"
    @change="emit"
  />

  <label
    :for="OPTION_ID"
    class="peer-focus:bg-cyan-300 peer-focus:text-cyan-900 px-2 py-[0.6rem] bg w-full block select-none text-center rounded-md cursor-pointer text-2xl active:bg-cyan-300 hover:bg-cyan-300 active:text-cyan-900 hover:text-cyan-900"
    :class="SELECTED_STATE"
    >{{ label }}</label
  >
</template>
