<script setup lang="ts">
import { ISelectOption } from "@/types.ts";
import { computed, onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  id: string;
  label: string;
  options: ISelectOption[];
  selectedOption: string;
  onSelectOption: (id: string) => void;
}>();
const isOpen = ref(false);
const toggleOpen = (value?: boolean) => {
  if (isOpen.value === value) {
    return;
  }
  if (value) {
    isOpen.value = value;
    return;
  }
  isOpen.value = !isOpen.value;
};
const getNameById = computed(() => {
  return props.options.find((option) => option.id === props.selectedOption)
    ?.name;
});
const optionsWrapper = ref();
const handleClickOutside = (event: MouseEvent) => {
  if (!event.composedPath().includes(optionsWrapper.value)) {
    toggleOpen(false);
  }
};
document.addEventListener("click", handleClickOutside);
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="optionsWrapper" class="input-wrapper select-wrapper">
    <label class="input-label" :for="id">{{ label }}</label>
    <div class="input select" :id="id" @click="toggleOpen()">
      {{ getNameById }}
    </div>
    <div class="options-wrapper" :class="{ open: isOpen }">
      <div
        class="options-item"
        v-for="item in options"
        @click="
          onSelectOption(item.id);
          toggleOpen();
        "
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  &-wrapper {
    cursor: pointer;
    min-width: 300px;
  }
}
.options {
  &-wrapper {
    max-height: 0;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    overflow: hidden;
    opacity: 0;
    &.open {
      max-height: 350px;
      opacity: 1;
    }
  }
  &-item {
    padding: 5px 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
@media screen and (max-width: 767px) {
  .select {
    &-wrapper {
      min-width: unset;
    }
  }
}
</style>
