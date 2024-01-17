import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IServer } from "@/types.ts";
import { ServersApi } from "@/api";

export const useServersStore = defineStore("posts", () => {
  const servers: Ref<IServer[]> = ref([]);
  const loading: Ref<boolean> = ref(false);

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };

  const fetchServers = async () => {
    try {
      setLoading(true);
      const { data } = await ServersApi.getAll();
      servers.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const getServer = (id: string) => {
    return servers.value.find((server) => server.customer_id === id);
  };
  const setServer = (newServer: IServer) => {
    const foundServer = servers.value.find(
      (server) => server.customer_id === newServer.customer_id,
    );
    if (foundServer) {
      foundServer.server_name = newServer.server_name;
      foundServer.server_type = newServer.server_type;
    }
  };
  return {
    servers,
    loading,
    fetchServers,
    getServer,
    setServer,
  };
});
