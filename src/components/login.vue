<template>
  <div style="margin: auto" >
      <div  style="height: 200px"></div>
      <Row >
          <Col span="6" push="18"><Input v-model="user" placeholder="账号" clearable style="width: 200px" /></Col></Row>
  <br>
      <Row><Col span="6" offset="18"><Input v-model="passwd" placeholder="密码" clearable style="width: 200px" /></Col></Row>
      <br>
      <Row><Col span="6" offset="18"><Button type="success" @click="onsubmit(user,passwd)"  style="width: 200px">登录</Button></Col></Row>

    <!--<div>{{getdata}}</div>-->
  </div>
</template>
<script>
    export default {
        data(){
        return {
            user:'',
            passwd:'',
            getdata:'',
            mesg:'',
      }
    },
    methods:{
        onsubmit:function (user,passwd) {
            this.$API.POST('/login',{name:user,password:passwd}).then(
                (resp) => {
                    if(resp.status === 200 && resp.headers.authorization ){
                        // console.log(resp);
                        this.$Util.setStorage({token:resp.headers.authorization});
                        this.$router.push('/select');
                    }else{
                        this.$Notice.error({
                            title:'验证失败',
                            desc:resp.data.mesg,}) ;
                        this.$router.push('/login');
                    }
                })
        },
        // 检测是否登录，如果登录了，继续请求登录页面，则跳转到主页
        jumptohome:function () {
            this.$router.push('/')
            },
        },
    mounted:function () {
            // TODO 检测TOken是否合法，如果是直接登录
        if(this.$Util.getStorage('token')){
            // this.$router.push('/');
        }
    }

    }
</script>
<style scoped>


</style>
