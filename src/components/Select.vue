<script setup lang="ts">
import { ref } from "vue";

import Input from "./Input.vue";
import Option from "./Option.vue";

import { IOption, IInputProps } from "../interfaces";
import {
  hasLeadingZero,
  hasLetter,
  hasSymbol,
  hasWhitespace,
  isDecimal,
} from "../validators";

const props = defineProps<{
  modelValue?: string;
  options: IOption[];
  name: string;
  error: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "update:error", has: boolean): void;
}>();

const CUSTOM = ref("");

const CUSTOM_PROPS: IInputProps = {
  label: "Custom",
  name: "custom",
  id: "custom",
  inputMode: "decimal",
  placeholder: "Custom",
  visibility: {
    error: false,
    label: false,
  },
  validator(value) {
    if (hasWhitespace(value)) return "Can't have whitespace";
    if (hasLetter(value)) return "Can't have letters";
    if (hasLeadingZero(value)) return "Can't have leading zero";
    if (!isDecimal(value) && hasSymbol(value)) return "Can't have symbol";
    return null;
  },
};

function emitError(has: boolean) {
  emits("update:error", has);
}

function emitSelected(value: string) {
  CUSTOM.value = "";
  emits("update:modelValue", value);
}

function emitCustom(value: string) {
  emits("update:modelValue", value);
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="text-cyan-800">
        Select Tip <span aria-label="Percentage">%</span>
      </legend>
      <ul
        class="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-[0.85rem] mt-5"
      >
        <li v-for="option in options">
          <Option
            v-bind="option"
            :name="name"
            :model-value="modelValue"
            @update:model-value="emitSelected"
          />
        </li>
        <li>
          <Input
            v-bind="CUSTOM_PROPS"
            v-model="CUSTOM"
            :error="error"
            :full-height="true"
            @update:error="emitError"
            @update:model-value="emitCustom"
          />
        </li>
      </ul>
    </fieldset>
  </div>
</template>
