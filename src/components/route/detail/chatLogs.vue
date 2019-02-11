<template>
    <div style="margin: auto;width: 90%">
        筛选条件
        <Divider orientation="left"></Divider>
        <Page :page-size="pageSize" :total="total" @on-change="changePage" show-total />
        <Divider orientation="left"></Divider>
        <Table :columns="columns" :data="logs" border ></Table>
        <Divider orientation="left"></Divider>
    </div>
</template>

<script>
	export default {
		name: "chatLog",
        data(){
		    return {
                logs:[],
                total:0,
                pageSize:30,
                columns:[
                    {title:'角色名', key:'rolename',width:100,fixed:'left'},
                    {title:'类型', key:'chattype',width:80},
                    {title:'平台', key:'plat',width:80},
                    {title:'渠道', key:'channel',width:100},
                    {title:'原始ID', key:'rawserverid',width:80},
                    {title:'服ID', key:'serverid',width:100},
                    {title:'账号', key:'accountid',width:150},
                    {title:'角色ID', key:'roleid',width:180},
                    {title:'等级', key:'rolelevel',width:80},
                    {title:'内容', key:'content',fixed:'left',minWidth:500},
                    {title:'时间', key:'generatetime',width:200},
                ]
            };
        },
        methods:{
            getData(currentPage,pageNum){
                this.$Util.startProgress();
		        this.$API.POST('/detail/chatLogs/logs', {currentPage:currentPage, pageNum:pageNum}).then(({data})=>{
		            this.$Util.successProgress();
		            this.logs =  data.data ;
                    this.total =  data.total ;
                })
            },
            changePage(page){
                this.getData(page, this.pageSize);
                // console.log('page:'+page);
            }
        },
        created:function () {
            this.getData(1, this.pageSize);
        }
	}
</script>

<style scoped>

</style>
