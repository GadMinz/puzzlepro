<script setup lang="ts">
import { useServersStore } from "@/store/servers.ts";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";

const store = useServersStore();
const { fetchServers } = store;
const { servers, loading } = storeToRefs(store);
onBeforeMount(() => {
  fetchServers();
});
</script>

<template>
  <ul class="server-list">
    <li
      class="server-list-item loading"
      v-if="loading"
      v-for="(_, index) in [...new Array(3)]"
      :key="index"
    ></li>
    <li v-else>
      <RouterLink
        class="server-list-item"
        v-for="server in servers"
        :to="'/' + server.customer_id"
        >{{ server.server_name }}</RouterLink
      >
    </li>
  </ul>
</template>

<style scoped lang="scss">
.server-list {
  &-item {
    display: block;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 100ms ease;
    color: #c2c7d0;
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &.router-link-active {
      background-color: #007bff;
      color: #fff;
    }
    &.loading {
      background: linear-gradient(110deg, #abaaaa 8%, #b5b5b5 18%, #a9a9a9 33%);
      width: 100%;
      animation: 1.5s shine linear infinite;
      background-size: 200% 100%;
      height: 2rem;
    }
  }
}
@media screen and (max-width: 767px) {
  .server-list {
    max-height: 10rem;
    overflow-y: auto;
  }
}
@keyframes shine {
  100% {
    background-position-x: -200%;
  }
}
</style>
