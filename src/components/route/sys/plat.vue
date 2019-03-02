<template>
    <div>
        <!--用户所有的项目平台授权;-->
        <!--需要返回这个项目下的所有角色，如果没有特殊配置，则为all-->
        <AuthorizationPlatChannel ref="platChannelModal"></AuthorizationPlatChannel>
        <div style="margin: auto;width: 60%">
        <Table stripe :columns="columns1" :data="userPlatChannel" >
            <template slot-scope="{ row, index }" slot="platChannel">
                <Button type="primary"   @click="show(row)">查看权限</Button>
            </template>
        </Table>
        </div>
        {{userPlatChannel}}
    </div>
</template>

<script>
	export default {
		name: "plat",
        components:{
            AuthorizationPlatChannel:()=>import('@/components/system/AuthorizationPlatChannel'),
        },
        data(){
		    return {
                userPlatChannel:[],
                columns1:[
                    {title:'用户',key:'user'},
                    {title:'设置权限',slot:'platChannel',maxWidth:200},
                ],
            }
        },
        created:function () {
            this.getData();
        },
        methods:{
		    getData(){
                this.$API.POST('/sys/plat/allPlat').then(({data})=>{
                    this.userPlatChannel = data;
                });
            },
		    show(data){
                this.$refs.platChannelModal.loadFatherData(data)
            }
        }
	}
</script>

<style scoped>

</style>
