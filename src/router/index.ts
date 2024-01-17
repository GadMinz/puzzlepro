import {createRouter, createWebHistory} from "vue-router";
import Main from "@/components/Main.vue";
import ServerEdit from "@/components/ServerEdit.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
        },
        {
            path: "/:id",
            name: "server",
            component: ServerEdit,
        },
    ],
});

export default router;