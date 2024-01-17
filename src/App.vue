<script setup lang="ts">
import ServerList from "@/components/ServerList.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const componentKey = ref(route.params.id);
watch(
  () => route.params.id,
  (newId) => {
    componentKey.value = newId;
  },
);
</script>

<template>
  <div class="wrapper">
    <aside class="side-bar">
      <ServerList />
    </aside>
    <main>
      <RouterView :key="componentKey as string" />
    </main>
  </div>
</template>

<style scoped>
main {
  flex: 1;
}
.wrapper {
  display: flex;
  height: 100%;
}
.side-bar {
  height: 100%;
  background-color: #343a40;
  min-width: 300px;
  padding: 20px 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
}
@media screen and (max-width: 767px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
