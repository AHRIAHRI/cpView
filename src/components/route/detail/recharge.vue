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
            <template slot-scope="{ row, index }" slot="paytype">
                <!--{{row.paytype}}-->
                <div v-if=" row.paytype == 1 ">普通</div>
                <div v-else-if=" row.paytype == 2 ">自充值</div>
                <div v-else-if=" row.paytype == 3 " style="color: #ff8562">内玩</div>
                <!--自定义表格会去掉颜色，这里就不再过滤了 -->
                <div v-else>{{row.paytype}}</div>
            </template>
        </Table>
        <!--<Icon type="md-download" />-->
        <Divider orientation="left"></Divider>
    </div>
</template>
<script>
	export default {
		name: "recharge",
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
                    {title:'角色名', key:'rolename',minWidth:200,fixed:'left',sortable: true,align:'center'},
                    {title:'充值金额', key:'amount',fixed:'left',sortable: true,width:120},
                    {title:'充值类型', key:'paytype', slot:'paytype',fixed:'left',sortable: true,width:120},
                    {title:'平台', key:'plat',width:80,sortable: true},
                    {title:'渠道', key:'channel',width:150,sortable: true},
                    {title:'原始ID', key:'rawserverid',width:100,sortable: true},
                    {title:'账号', key:'accountid',width:150},
                    {title:'角色ID', key:'roleid',width:180},
                    {title:'等级', key:'rolelevel',width:80,sortable: true},
                    {title:'时间', key:'generatetime',width:200,sortable: true},
                    {title:'当前服ID', key:'serverid',width:120,sortable: true},
                    {title:'物品名称', key:'shopname',width:120},
                    {title:'物品数量', key:'virtualamount',width:120,sortable: true},
                    {title:'订单号', key:'orderid',minWidth:250},
                    {title:'币种', key:'amounttype',width:80},
                    {title:'设备', key:'deviceid',minWidth:250,sortable: true},

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
                this.$API.POST('/detail/recharge/logs', {currentPage:currentPage, pageNum:pageNum, filter:this.filterData}).then(({data})=>{
                    this.logs =  data.data ;
                    this.total =  data.total ;
                })
            },

            getOptionData(){
                this.$API.POST('/detail/recharge/options').then(({data})=>{
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
                    filename: '充值订单_'+this.$Util.time(),
                    // original: false,
                    columns: this.columns.map(function (x) {
                        return x;
                    }),
                    data: this.logs.map(function (x) {
                        if( x.paytype == 1 ){
                            x.paytype = '普通'
                        }else if(x.paytype == 3){
                            x.paytype = '内玩'
                        }
                        return x
                    })
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
