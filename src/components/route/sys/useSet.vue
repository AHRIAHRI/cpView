<template>
    <div style="width: 50% ;margin: auto">

            <Divider orientation="left">
            <i style="color: #e41028;">修改你的信息</i>
            </Divider>

        <Form ref="formItem" :model="formItem"  style="width:300px ; margin: auto" :label-width="80"  >
            <FormItem label="手机号码">
                <Input v-model="formItem.tel" clearable placeholder="按需修改你的手机号码"></Input>
            </FormItem>
            <FormItem label="选择项目">
                <Select v-model="formItem.selectProject" clearable style="width:200px">
                    <Option v-for="item in projectList" :value="item.project" :key="item.project">{{item.name}}</Option>
                </Select>

            </FormItem>
            <FormItem label="新的密码">
                <Input type="password" v-model="formItem.passwd" clearable placeholder="按需修改你的密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="success" @click="userModifySubmit('formItem')" long >提交修改</Button>
            </FormItem>
        </Form>
        <Divider orientation="left">
        </Divider>
{{formItem}}
    </div>
</template>

<script>
	export default {
		name: "useSet",
        data(){
		    return {
                formItem:{
                    tel:'',
                    selectProject:'',
                    passwd:'',
                },
                projectList:[]
            }
        },
        created:function () {
		    this.$API.POST('/sys/useSet/userInfoList').then(({data}) => {
		            this.projectList = data.projectList;
            })
        },
        methods:{
		    // TODO 验证通过之后进行体提交
            userModifySubmit(formItem){
                this.$API.POST('/sys/useSet/changeInfo',this.formItem).then(({data})=>{
                    console.log(data);
                    if('success' === data ){
                        this.$Notice.success({title:'用户信息修改成功'});
                        // TODO 强制退出刷新 把选择项目写入缓存
                    }else{
                        this.$Notice.success({title:'用户信息修改异常'+ JSON.stringify(data)});
                    }
                }).then((response) => {this.$Message.error('异常的请求' + response.status)})

            }
        }
	}
</script>

<style scoped>

</style>
