<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue?: string;
  label: string;
  value: string;
  name: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const IS_SELECTED = computed(() => props.value === props.modelValue);

const SELECTED_STATE = computed(() => {
  return {
    "!bg-cyan-500": IS_SELECTED.value,
    "!text-cyan-900": IS_SELECTED.value,
  };
});

function emit(event: Event) {
  emits("update:modelValue", (<HTMLInputElement>event.target).value);
}
</script>

<template>
  <label
    class="px-2 py-[0.6rem] w-full block select-none text-center rounded-md cursor-pointer text-xl text-white bg-cyan-900"
    :class="SELECTED_STATE"
  >
    <span>{{ label }}</span>
    <input
      class="sr-only"
      type="radio"
      :name="name"
      :value="value"
      :checked="IS_SELECTED"
      @change="emit"
    />
  </label>
</template>
