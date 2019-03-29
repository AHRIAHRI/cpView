<template>
    <div style="margin: auto;width: 95%">
        <Collapse simple>
            <Panel name="1">
                打开条件过滤
                <div slot="content">
                    <GeneralFilter :rawOptionData="rawOptionData" @sendDataEven="selectDataEven" @isclick="reloadRequest">
                    </GeneralFilter>
                </div>
            </Panel>
        </Collapse>
        <Divider orientation="left"></Divider>
        <Page :page-size="pageSize" :page-size-opts="pageSizeOption" :total="total" @on-change="changePage" @on-page-size-change="changePageSize" prev-text="上一页" next-text="下一页" show-total show-sizer show-elevator />
        <Divider orientation="left"></Divider>
        <div style="text-align: right"><Icon type="md-download" @click="exportData"></Icon></div>
        <Table :columns="columns" :data="logs" border size="small" ref="table">
        </Table>
        <!--<Icon type="md-download" />-->
        <Divider orientation="left"></Divider>
    </div>
</template>

<script>
	export default {
		name: "mail",
		data(){
			return {
				filterData:{
					chatType:'',
					plat:'',
					channel:'',
					roleName:'',
					roleID:'',
					userAccount:'',
					rangeTime:'',
					openLevel:false,
					rangeLevel:[1,1000],
					gameServerID:'',
					rawGameServerID:'',
				},
				chatTypeOption:{},
				logs:[],
				total:0,
				pageSize:100,
				rawOptionData:{},
				pageSizeOption:[20,50,100,200,500],
				columns:[
					{title:'角色名', key:'rolename',minWidth:120,fixed:'left',sortable: true},
					{title:'类型', key:'mailfrom',fixed:'left',sortable: true,width:80},
					{title:'标题', key:'title',fixed:'left',width:200},
					{title:'内容', key:'content',minWidth:550,sortable: true,fixed:'left'},
					{title:'附件', key:'options',width:220,sortable: true,fixed:'left'},
					// {title:'货币', key:'category',width:80,sortable: true},
					// {title:'货币消耗', key:'categorycount',width:120,sortable: true},
					{title:'平台', key:'plat',width:80,sortable: true},
					{title:'渠道', key:'channel',width:150,sortable: true},
					// {title:'原始ID', key:'rawserverid',width:100,sortable: true},
					{title:'服ID', key:'serverid',width:80,sortable: true},
					// {title:'账号', key:'accountid',width:150},
					{title:'角色ID', key:'roleid',width:180},
					{title:'等级', key:'rolelevel',width:80,sortable: true},
					{title:'时间', key:'generatetime',width:200,sortable: true},

				],
			};
		},
		components:{
			GeneralFilter:()=>import('@/components/system/GeneralFilter'),
		},
		methods:{
			format(val){
				return '等级范围取值 ' + val + " 级";
			},
			getData(currentPage,pageNum){
				this.$API.POST('/detail/mail/logs', {currentPage:currentPage, pageNum:pageNum, filter:this.filterData}).then(({data})=>{
					this.logs =  data.data ;
					this.total =  data.total ;
				})
			},

			getOptionData(){
				this.$API.POST('/detail/mail/options').then(({data})=>{
					this.rawOptionData = data;
				})
			},
			selectDataEven(val){
				this.filterData = val;
			},
			changePage(page){
				this.getData(page, this.pageSize);
			},
			changePageSize(pageSize){
				this.pageSize = pageSize ;
				this.getData(1, this.pageSize);
			},
			reloadRequest(){
				this.getData(1, this.pageSize);
			},

			exportData(){
				this.$refs.table.exportCsv({
					filename: '邮件_'+this.$Util.time(),
					original: false
				});
			}
		},
		mounted:function () {
			this.getData(1, this.pageSize);
			this.getOptionData();
		}
	}
</script>

<style scoped>

</style>
