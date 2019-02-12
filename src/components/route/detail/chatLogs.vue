<template>
    <div style="margin: auto;width: 90%">
        <Collapse simple>
            <Panel name="1">
                打开条件过滤
                <Form :model="filterData" slot="content" :label-width="80">
                <!--<div slot="content"  style="margin: auto;width: 90%">-->

                    <FormItem>
                            <Select v-model="filterData.plat" placeholder="选择平台" filterable multiple style="width: 100%">
                                <Option v-for="item in optionData.plat" :value="item.value" :key="item.value">{{ item.alias }}</Option>
                            </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="filterData.channel" placeholder="选择渠道" filterable multiple style="width: 100%">
                            <Option v-for="item in optionData.channel" :value="item.value" :key="item.value">{{ item.alias }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="filterData.chatType" placeholder="聊天类型" filterable multiple style="width: 100%">
                            <Option v-for="item in optionData.chatType" :value="item.value" :key="item.value">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Col span="8">
                            <!--角色名:-->
                            <Input v-model="filterData.gameServerID" placeholder="游戏服务器ID" clearable style="width: 80%" />
                        </Col>
                        <Col span="8">
                            <!--角色名:-->
                            <Input v-model="filterData.rawGameServerID" placeholder="原始游戏服务器ID(合服前)" clearable style="width: 80%" />
                        </Col>

                    </FormItem>

                    <FormItem>
                        <Col span="8">
                            <!--角色名:-->
                            <Input v-model="filterData.roleName" placeholder="模糊匹配角色名" clearable style="width: 80%" />
                        </Col>
                        <Col span="8">
                            <!--角色ID:-->
                            <Input v-model="filterData.roleID" placeholder="角色ID" clearable style="width: 80%" />
                        </Col>
                        <Col span="8">
                            <!--用户ID:-->
                            <Input v-model="filterData.userAccount" placeholder="玩家用户ID" clearable style="width: 80%" />
                        </Col>
                    </FormItem>
                    <FormItem>
                        <CustomDate @send_time="getSelectData" />
                    </FormItem>
                    <FormItem>
                        <Slider :min="optionData.level.min" :max="optionData.level.max" v-model="filterData.rangeLevel"  :tip-format="format" range></Slider>
                    </FormItem>
                    <FormItem>
                        <Button type="success" ghost long>加入过滤</Button>
                    </FormItem>

                <!--</div>-->
                </Form>
            </Panel>
        </Collapse>
        <Divider orientation="left"></Divider>
        当前过滤条件
        <br>
        {{filterData}}
        <Divider orientation="left"></Divider>
        <Page :page-size="pageSize" :page-size-opts="pageSizeOption" :total="total" @on-change="changePage" @on-page-size-change="changePageSize" prev-text="上一页" next-text="下一页" show-total show-sizer show-elevator />
        <Divider orientation="left"></Divider>
        <Table :columns="columns" :data="logs" border ></Table>
        <Divider orientation="left"></Divider>
    </div>
</template>

<script>
	export default {
		name: "chatLog",
        // TODO 相同和不通组件的抽离
        // TODO option 的翻译配置数据中的翻译配置 这个是难点
        // TODO 平台->渠道的联动选择
        // TODO 数据库中option的分类
        // TODO 选项的保持 vuex 中
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
                    rangeLevel:[1,1000],
                    gameServerID:'',
                    rawGameServerID:'',

                },
                optionData:{
		            chatType:[
                        {value:'公会'},
                        {value:'私聊'},
                        {value:'世界'},
                    ],
                    plat:[
                        {value:'s00',alias:"诗悦买量"},
                        {value:'ms1',alias:"融合买量"},
                    ],
                    channel:[
                        {value:'ms1/7',alias:"融合买量/应用宝"},
                        {value:'s00/s12',alias:"诗悦买量/s12渠道"},
                    ],
                    level:
                        {min:1,max:1000}
                },

                logs:[],
                total:0,
                pageSize:20,
                pageSizeOption:[20,50,100,200],
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
            format(val){
                return '等级范围取值 ' + val + " 级";
            },
            getData(currentPage,pageNum){
		        this.$API.POST('/detail/chatLogs/logs', {currentPage:currentPage, pageNum:pageNum}).then(({data})=>{
		            this.logs =  data.data ;
                    this.total =  data.total ;
                })
            },
            getSelectData(time){
                this.filterData.rangeTime = time
            },
            changePage(page){
                this.getData(page, this.pageSize);
            },
            changePageSize(pageSize){
                this.pageSize = pageSize ;
                this.getData(1, this.pageSize);
            }
        },
        created:function () {
            this.getData(1, this.pageSize);
        }
	}
</script>

<style scoped>

</style>
