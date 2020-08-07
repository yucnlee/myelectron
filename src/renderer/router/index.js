import Vue from 'vue'
import Router from 'vue-router'
import tabledata from "@/components/table.vue";
import sider from '@/components/sider.vue';
import sidermqtt from '@/components/sidermqtt.vue';
import addMqttConnectionDialog from '@/components/dialog/addMqttConnectionDialog'
import mqtt from '@/page/mqtt'

Vue.use(Router)

export default new Router({
  routes: [{
      path: "/",
      name: "home-page",
      component: () => import("@/page/home.vue"),
      redirect: "/table",
      children: [{
          path: "/table",
          name: "tablepage",
          components: {
            default: tabledata,
            sider: sider,
          }
        },
        {
          path: "/click",
          component: () => import("@/components/click.vue"),
        },
        {
          path: "/mqtt",
          name: "mqtt",
          components: {
            default: mqtt,
            sider: sidermqtt,
          }
        },
        {
          path: "/addMqtt",
          name: "addMqtt",
          components: {
            default: addMqttConnectionDialog,
            sider: sidermqtt,
          }
        },
      ],
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});

// 消除重复路由的错误
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};