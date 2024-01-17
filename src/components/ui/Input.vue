<script setup lang="ts">
defineProps({
  placeholder: String,
  label: String,
  id: String,
  error: String,
});
const modelValue = defineModel<string>();
</script>

<template>
  <div class="input-wrapper">
    <label class="input-label" :for="id">{{ label }}</label>
    <input
      class="input"
      :class="{ error: error }"
      type="text"
      v-model="modelValue"
      :placeholder="placeholder"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
