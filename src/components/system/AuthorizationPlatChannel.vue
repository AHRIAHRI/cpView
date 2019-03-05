<template>
    <div>
        <Modal v-model="isShow" width="50%" :closable="false" stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <Table border :columns="table1.columns" :data="data">
                <template slot-scope="{ index }"  slot="project">
                    开启整个项目
                    <i-switch v-model="data[index].all" @on-change="change" />
                </template>
                <template slot-scope="{index}"  slot="plat">
                    <PlatAndChannel ref="platAndChannel"  v-model="data[index].plats" ></PlatAndChannel>
                </template>
            </Table>
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
	export default {
		name: "AuthorizationPlatChannel",
        // components:{
        //     platAndChannel:()=>import('@/components/system/PlatAndChannel'),
        // },
        data(){
            return {
                isShow: false,
                title: '',
                projectDisabled:false,
                data: [],
                table1: {
                    columns: [
                        {title: '',align:'center',slot:'project',maxWidth:200},
                        {title: '',align:'center',slot:'plat'},
                        // {title: '渠道',align:'center',slot:'channel'},
                    ],
                    data :[],
                    },
                }
            },
        methods:{
            loadFatherData(data){
                this.isShow = true ;
                this.title = '给用户[ ' + data.user + ' ]平台渠道授权';
                this.user = data.user ;
                this.data = [data.platChannel];
            },
            commitModify(){
                this.isShow = false;
                // 提交授权
                this.$API.POST('/sys/plat/commitAuthorization',{user:this.user,data:this.data}).then(({data}) => {
                        if(data.status){
                            this.$Notice.success({title:'用户渠道权限修改成功',});
                            // 通知上层组件刷新接口
                            this.$emit('refreshInterfacte',true)
                        }else{
                            this.$Notice.error({title:'用户渠道权限修改失败',});
                        }
                    }
                )
            },
            change(status){
                // 不要问我为什么这里用vuex,无奈之举,这里出现了一个傻逼样的BUG.
                this.$store.commit({
                    type:'modifySelectProject',
                    status:status,
                });
            }
        }
	}
</script>

<style scoped>

</style>
