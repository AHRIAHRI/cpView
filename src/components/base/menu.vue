<template>
  <div style="margin: auto">

      <Divider>项目:<i style="color: #19be6b">{{projectName}}</i><Divider type="vertical" />你好,<i style="color: #19be6b">{{username}}</i><Divider type="vertical" /><i @click="logout" style="color:#c5c8ce ">点击退出登录</i></Divider>

    <Menu :mode="styleMode" theme="light" active-name="1" >
      <Submenu v-for="(nav,key1) in menuList" :name="nav.name" :key="key1">
        <template slot="title">
          <Icon :type="nav.icon" />
          {{nav.alias}}
        </template>
        <MenuItem v-for="(item,key2) in nav.subMeun" :key="key2" :name="item.addr" :to="item.addr">{{item.alias}}</MenuItem>
      </Submenu>
  </Menu>
  <br>
  <div style="width: 90%;margin: auto">  <router-view/></div>

  </div>
</template>
<style scoped>

</style>
<script>
import { menu  } from "Config/game";

export default {
    data () {
        return {
            styleMode: 'horizontal',
            theme1: 'light',
            menuList: menu,
            projectName:'',
            username:'',
        }
    },
    methods:{
        logout:function () {
        localStorage.clear();
        this.$router.push('/login');},
    },
    mounted:function () {
        this.projectName = this.$Util.getStorage('project') || '没有选择一个项目';
        this.username = '游客';
    }
}
</script>
