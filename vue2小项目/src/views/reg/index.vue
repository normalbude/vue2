<template>
  <div>
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <formSubmitVue @submit="submit"></formSubmitVue>
  </div>
</template>

<script>
import formSubmitVue from "@/components/form-submit.vue";
export default {
  components: {
    formSubmitVue,
  },
  methods: {
    submit(values) {
      console.log(values);
    },
  },
};
</script>