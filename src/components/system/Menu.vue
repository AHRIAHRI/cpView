<template>
  <div >
      <div style="width: 60%;">
      <Divider orientation="left">项目:<i style="color: #19be6b">{{projectName}}</i><Divider type="vertical" />你好,<i style="color: #19be6b">{{username}}</i><Divider type="vertical" /><i @click="logout" style="color:#c5c8ce ">点击退出登录</i></Divider>
      </div>
    <Menu :mode="styleMode" theme="light" active-name="1">
      <Submenu v-for="(nav,key1) in menuList" :name="nav.name" :key="key1">
        <template slot="title">
          <Icon :type="nav.icon" />
          {{nav.alias}}
        </template>
        <MenuItem v-for="(item,key2) in nav.subMeun" :key="key2" :name="item.addr" :to="item.addr">{{item.alias}}</MenuItem>
      </Submenu>
  </Menu>
  <br>
  <!--<div style="width: 90%;margin: auto">  <router-view/></div>-->

  </div>
</template>
<style scoped>

</style>
<script>
export default {
    data () {
        return {
            styleMode: 'horizontal', //vertical
            theme1: 'light',
            menuList: '',
            projectName:'',
            username:'',
        }
    },
    computed:{

    },
    methods:{
        logout:function () {
        localStorage.clear();
        this.$router.push('/login');},
    },
    // TODO 如果检测token过期，则跳转到登录页面
    created:function () {
        this.$router.addRoutes(this.$Util.generateRouteComponents());
        this.projectName = this.$Util.getStorage('project') || '没有选择一个项目';
        this.username = '游客';
        this.menuList = this.$store.state.menu ;
    }
}
</script>
