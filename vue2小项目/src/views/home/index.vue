<template>
  <div>
    <home-header-vue v-model="currentCategory"></home-header-vue>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in slides" :key="index">
        <img :src="item.url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import homeHeaderVue from "./home-header.vue";
import { createNamespacedHelpers } from "vuex";
import * as Types from "@/store/action-types.js";
let {
  mapState: mapHomeState,
  mapMutations: mapHomeMutations,
  mapActions: mapHomeActions,
} = createNamespacedHelpers("home");
export default {
  methods: {
    ...mapHomeMutations([Types.SET_CATEGORY]),
    ...mapHomeActions([Types.SET_SLIDES]),
  },
  async mounted() {
    if (this.slides.length === 0) {
      try {
        await this[Types.SET_SLIDES]();
      } catch (e) {
        //错误处理
        console.log(e);
      }
    }
  },
  computed: {
    ...mapHomeState(["category", "slides"]),
    currentCategory: {
      get() {
        return this.category;
      },
      set(value) {
        this[Types.SET_CATEGORY](value);
      },
    },
  },

  components: {
    homeHeaderVue,
  },
  data() {
    return {
      value: -1,
    };
  },

  // methods: {
  //   change(newValue) {
  //     this.value = newVlaue;
  //   },
  // },
};
</script>
<style scoped>
img {
  width: 100%;
}
</style>