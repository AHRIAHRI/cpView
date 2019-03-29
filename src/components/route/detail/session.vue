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
		name: "session",
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
				/**
                 *
                 id	1297477
				 product	sjjy_cn
				 plat	yx1
				 channel	rzwandroid
				 rawserverid	23
				 serverid	23
				 accountid	yx1_20534868
				 roleid	yx1_24117537_23
				 rolename	瑾夏
				 onlinetime	3356
				 bindzuanshi	605
				 zuanshi	971
				 allrecharge	0
				 zdl	862724
				 rolelevel	199
				 generatetime	2019-03-20 20:02:12
				 inserttime	2019-03-20 20:04:26
				 status_id	0
				 sessionid	yx1_6670427705016582433
				 */
				columns:[
					{title:'角色名', key:'rolename',minWidth:120,fixed:'left',sortable: true},
					{title:'在线时长', key:'onlinetime',fixed:'left',sortable: true,width:110},
					{title:'钻石(绑定)', key:'bindzuanshi',fixed:'left',width:110},
					{title:'钻石', key:'zuanshi',width:100,sortable: true,fixed:'left'},
					{title:'总充值', key:'allrecharge',width:100,sortable: true,fixed:'left'},
					{title:'战斗力', key:'zdl',width:180,sortable: true},
					{title:'平台', key:'plat',width:80,sortable: true},
					{title:'渠道', key:'channel',width:150,sortable: true},
					{title:'原始ID', key:'rawserverid',width:100,sortable: true},
					{title:'服ID', key:'serverid',width:80,sortable: true},
					{title:'账号', key:'accountid',width:150},
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
				this.$API.POST('/detail/session/logs', {currentPage:currentPage, pageNum:pageNum, filter:this.filterData}).then(({data})=>{
					this.logs =  data.data ;
					this.total =  data.total ;
				})
			},

			getOptionData(){
				this.$API.POST('/detail/session/options').then(({data})=>{
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
					filename: '会话_'+this.$Util.time(),
					original: false
				});
			}
		},
		created:function () {
			this.getData(1, this.pageSize);
			this.getOptionData();
		}
	}
</script>

<style scoped>

</style>
