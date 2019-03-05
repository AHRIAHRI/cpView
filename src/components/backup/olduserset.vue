<template>
    <div>
        <Divider orientation="left"><i>选择项目</i></Divider>
            <div style="margin: auto ;width: 60%">
                <Table :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button ghost type="success" icon="md-checkmark" size="small" style="margin-right: 5px" @click="select(index)"></Button>
                    </template>
                </Table>
            </div>

        <Divider orientation="left">权限分配</Divider>
        添加角色
        添加用户
        <Divider orientation="left">修改密码</Divider>

<!--<Button @click="reload">强制刷新页面</Button>-->


    </div>
</template>

<script>
	export default {
		name: "userset",
        data(){
		    return {
                columns1: [
                    {title: '', key: 'name'},
                    {title: '', key: 'code'},
                    {title: 'Select', slot: 'action', width: 150, align: 'center'}
                ],
                data1: [
                ]
            }
        },
        methods:{
            select (index) {
                let code = this.data1[index].code ;
                let name = this.data1[index].name ;
                this.$API.POST('/sys/useSet/select',{select:code}).then(({data}) => {
                    if(data === 'success'){
                        this.$Util.setStorage({project:name});
                        this.$Notice.success({
                            title:'选择了项目 '+name+'('+code+')',
                            desc: '稍等2秒，重新加载数据',
                            duration:2,
                            onClose:function () {this.$Util.windowsReload();}});
                        }else{
                        this.$Notice.error({
                            title:'选择了项目'+name+'('+code+')',
                            desc: '异常的选择，请稍后再试',
                            duration:5,});
                    }
                    }
                );


            },
            reload(){
                this.$Util.windowsReload();
            }
	    },
        mounted:function(){
		    this.$API.POST('/sys/useSet/all').then((response) => {
		        console.log(response.data);
		        this.data1 = response.data;
		        }
            )
        }
	}
</script>

<style scoped>

</style>
