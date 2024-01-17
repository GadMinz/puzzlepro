import axios from "axios";
import { IServer } from "@/types.ts";
axios.defaults["baseURL"] = "/";

export const ServersApi = {
  async getAll() {
    return await axios.get<IServer[]>("servers.json");
  },
};
