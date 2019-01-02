<template>
  <div class="login" >
      <!--<Card title="FENGBAO.NET" icon="ios-options" :padding="0" shadow style="width: 400px;">-->
    <Input v-model="user" placeholder="账号" clearable style="width: 200px" />
    <Input v-model="passwd" placeholder="密码" clearable style="width: 200px" />
    <Button type="success" @click="onsubmit(user,passwd)"  style="width: 200px">SUBMIT</Button>
    <div>{{getdata}}</div>
    <!--<Button type="success" @click="jumptohome"  style="width: 200px">跳转到登录页面</Button>-->
    <!--<Button @click="open">{{mesg}}</Button>-->
      <!--</Card>-->
  </div>
</template>
<script>
    import API  from '../mode/request';
    import Util from  '../mode/util';
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
            API.POST('/login',{name:user,password:passwd}).then(
                (resp) => {
                    if(resp.status === 200 && resp.headers.authorization ){
                        console.log(resp);
                        Util.setStorage({token:resp.headers.authorization});
                        this.$router.push('/');
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
        }
    }
</script>
<style scoped>
    .login {
        width: 50%;
        text-align: right;
        /*border: 1px dotted black;*/
    }

</style>
