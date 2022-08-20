<template>
  <div class="profile">
    <van-nav-bar title="个人中心"></van-nav-bar>
    <div class="profile-info">
      <template v-if="!$store.state.user.hasPermission">
        <img src="@/assets/logo.png" />
        <van-button size="small" to="/login">登录</van-button>
      </template>
      <template v-else>
        <img src="@/assets/logo.png" />
        <span>{{ $store.state.user.username }}</span>
      </template>
    </div>
    <template v-if="$store.state.user.menuPermission">
      <van-tabs type="card">
        <van-tab
          v-for="(item, index) in $store.state.user.authList"
          :title="item.name"
          :key="index"
          :to="item.path"
        ></van-tab>

        <!-- <van-tab title="标签1">内容一</van-tab>
        <van-tab title="标签2">内容二</van-tab>
        <van-tab title="标签3">内容三</van-tab> -->
      </van-tabs>
      <router-view></router-view>
    </template>
    <van-button v-has="'edit'">编辑</van-button>
    <van-button v-has="'remove'">删除</van-button>
  </div>
</template>

<style lang="scss">
.profile {
  .profile-info {
    display: flex;
    align-items: center;
    height: 150px;
    padding: 0 15px;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>