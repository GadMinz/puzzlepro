<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { onBeforeMount, Ref, ref, watch } from "vue";
import Input from "@/components/ui/Input.vue";
import Select from "@/components/ui/Select.vue";
import { useServersStore } from "@/store/servers.ts";
import { IServer } from "@/types.ts";
import { storeToRefs } from "pinia";
const serverTypes = [
  { id: "vds", name: "Vds" },
  { id: "dedicated", name: "Dedicated" },
  { id: "hosting", name: "Hosting" },
];
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);
const nameModelValue = ref("");
const nameModelError = ref("");
const typeSelected = ref("vds");

const toggleTypeSelect = (id: string) => {
  typeSelected.value = id;
};
const server: Ref<IServer | undefined> = ref(undefined);
const store = useServersStore();
const { getServer, setServer } = store;
const { loading } = storeToRefs(store);
const onSubmit = () => {
  nameModelError.value = "";
  const name = nameModelValue.value;
  if (!name || name.trim() === "") {
    nameModelError.value = "Введите название";
    return;
  }
  if (name.length > 32) {
    nameModelError.value = "Максимальная длина 32 символа";
    return;
  }
  setServer({
    server_name: nameModelValue.value,
    server_type: typeSelected.value,
    customer_id: id.value as string,
  });
};
const reloadServerInfo = () => {
  server.value = getServer(id.value as string);
  if (!server.value) {
    router.push("/");
    return;
  }
  nameModelValue.value = server.value.server_name;
  typeSelected.value = server.value.server_type;
};
watch(loading, () => {
  if (!loading.value) {
    reloadServerInfo();
  }
});
onBeforeMount(() => {
  if (!loading.value) {
    reloadServerInfo();
  }
});
onBeforeRouteUpdate((_to, _from, next) => {
  if (
    server.value?.server_type !== typeSelected.value ||
    server.value.server_name !== nameModelValue.value
  ) {
    if (confirm("Не сохраненные изменения будут удалены. Сохранить?")) {
      onSubmit();
      if (nameModelError.value) {
        return;
      }
    }
  }
  next();
});
</script>

<template>
  <div class="container">
    <h1>Редактировать сервер</h1>
    <form class="form" @submit.prevent="onSubmit" v-if="!loading">
      <div class="form-body">
        <Input
          label="Имя сервера"
          :id="'input_' + id"
          placeholder="Имя сервера"
          v-model="nameModelValue"
          :error="nameModelError"
        />
        <Select
          label="Тип сервера"
          :id="'select_' + id"
          :options="serverTypes"
          :selected-option="typeSelected"
          :on-select-option="toggleTypeSelect"
        />
      </div>
      <div class="form-footer">
        <button class="btn" type="submit">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
h1 {
  margin-bottom: 1rem;
}
.form {
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 1rem;
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  &-body {
    display: flex;
    flex-wrap: wrap;
  }
  &-footer {
    text-align: end;
    margin-top: auto;
  }
}
.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  transition: opacity 100ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }
}
@media screen and (max-width: 767px) {
  .btn {
    width: 100%;
  }
  .container {
    padding: 30px 15px 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
