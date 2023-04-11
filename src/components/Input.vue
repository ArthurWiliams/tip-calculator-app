<script setup lang="ts">
import { reactive, computed } from "vue";

const props = defineProps<{
  modelValue?: string;
  error: boolean;
  label: string;
  visibility: {
    label: boolean;
    error: boolean;
  };
  name: string;
  id: string;
  placeholder?: string;
  inputMode: "decimal" | "numeric";
  icon?: string;
  fullHeight?: boolean;
  validator(value: string): string | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:error", has: boolean): void;
}>();

const ERROR_ID = props.id + "Error";
const ERROR = reactive({
  has: computed({
    get() {
      return props.error;
    },
    set(value: boolean) {
      emits("update:error", value);
    },
  }),
  disc: "",
});

function emit(event: Event) {
  const VALUE = (<HTMLInputElement>event.target).value;
  const message = props.validator(VALUE);

  emits("update:modelValue", VALUE);

  if (message !== null) {
    ERROR.has = true;
    ERROR.disc = message;
  } else {
    ERROR.has = false;
    ERROR.disc = "";
  }
}
</script>

<template>
  <div :class="{ 'h-full': fullHeight }">
    <div class="flex justify-between">
      <label
        class="text-cyan-800"
        :class="{ 'sr-only': !visibility.label }"
        :for="id"
        >{{ label }}</label
      >
      <span
        class="text-red"
        :class="{ 'sr-only': !ERROR.has || !visibility.error }"
        :id="ERROR_ID"
        >{{ ERROR.disc }}</span
      >
    </div>
    <div class="relative" :class="{ 'h-full': fullHeight }">
      <img
        class="left-4 pointer-events-none absolute top-1/2 translate-y-[-50%]"
        alt="input icon"
        v-if="icon"
        :src="icon"
      />
      <input
        class="px-4 py-2 placeholder:text-cyan-400 placeholder:opacity-70 rounded-md w-full block text-xl focus:outline outline-2 outline-cyan-500 text-right text-cyan-900 bg-cyan-100"
        type="text"
        autocomplete="off"
        :class="{
          'outline-red outline': ERROR.has,
          'py-0 h-full': fullHeight,
          'mt-1': visibility.error || visibility.label,
        }"
        :value="modelValue"
        :inputmode="inputMode"
        :aria-describedby="ERROR_ID"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        @input="emit"
      />
    </div>
  </div>
</template>
