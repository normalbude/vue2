<template>
  <div>
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <formSubmitVue @submit="submit"></formSubmitVue>
  </div>
</template>

<script>
import formSubmitVue from "@/components/form-submit.vue";
import { createNamespacedHelpers } from "vuex";
import * as Types from "@/store/action-types.js";
import { Dialog } from "vant";
let { mapState: mapLoginState, mapActions: mapLoginActions } =
  createNamespacedHelpers("user");
export default {
  components: {
    formSubmitVue,
  },
  methods: {
    // ...mapLoginState([Types.SET_LOGIN]),
    ...mapLoginActions([Types.SET_LOGIN]),

    async submit(values) {
      try {
        await this[Types.SET_LOGIN](values);
        this.$router.push("/profile");
      } catch (e) {
        Dialog.alert({
          title: "登陆失败",
          message: e.data,
        });
      }
    },
  },
};
</script>
