<template>
  <div>
      <div style="width: 60%;">
      <Divider orientation="left">项目:
          <router-link :to="{ name: 'userSet'}">
          {{this.$store.state.selectProjectName}}({{this.$store.state.selectProject}})
          </router-link><Divider type="vertical" />你好,{{this.$store.state.userName}}<Divider type="vertical" /><i @click="logout" style="color:#c5c8ce ">点击退出登录</i></Divider>
      </div>
    <Menu :mode="styleMode" theme="light" active-name="1">
      <Submenu v-for="(nav,key1) in this.$store.state.menu" :name="nav.name" :key="key1">
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
        this.$Util.reloadUserInfo();
        if(0 === this.$store.state.menu.length){
            // 如果没有菜单栏信息,提示用户没有任何权限
            // this.$router.push('/notPermission');
            // this.$router()
            this.$Notice.error({
                title: '在这个项目下,您没有任何权限',
                desc: '请联系管理员授权之后，再刷新页面。',
                duration: 0,
            });
            // this.$router.push('notPermission');
        }else{
            // console.log('aaaaaaaaaaaaaaaaaaaa');

            this.$router.addRoutes(this.$Util.generateRouteComponents());
            // this.projectName =  this.$store.state.selectProject || '没有选择一个项目'; // 冲vuex中取数据
            // this.username = this.$store.state.userName;
            this.menuList = this.$store.state.menu;
        }
    },
    mounted:function () {
        // this.$Util.successProgress();
    }
}
</script>
