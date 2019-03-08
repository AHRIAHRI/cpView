<template>
    <div style="width: 60%;margin: auto">
        <Form :model="filterData" slot="content" :label-width="80">
            <!--<div slot="content"  style="margin: auto;width: 90%">-->

            <FormItem>
                <Select v-model="filterData.plat" placeholder="选择平台" filterable multiple style="width: 100%">
                    <Option v-for="item in optionPlat" :value="item.value" :key="item.value">{{ item.alias }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="filterData.channel" placeholder="选择渠道(不选为全部)" filterable multiple style="width: 100%">
                    <Option v-for="item in optionChannel" :value="item.value" :key="item.value">{{ item.alias }}</Option>
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
                <CustomDate @send_time="getSelectTime" />
            </FormItem>
            <FormItem>
                等级过滤 &nbsp;: <i-switch v-model="filterData.openLevel" />
                <Slider :disabled="!filterData.openLevel" :min="optionLevMin" :max="optionLevMax" v-model="filterData.rangeLevel"  :tip-format="format" range></Slider>
            </FormItem>
            <FormItem>
                <Button type="success" ghost long @click="buttonClick">加入过滤</Button>
            </FormItem>
            <!--</div>-->
            <slot name="otherOption"></slot>

        </Form>
        <!--<div style="height: 100px"></div>-->
    </div>
</template>

<script>
	export default {
		name: "ChatLogFilter",
        data(){
		    return {
                switchStatus:false,
                optionData:{
                    plat:[],
                    channel:[],
                    servers:[],
                    rawServers:[],
                    level:{
                        min:0,
                        max:1000,
                    }
                },
                filterData:{
                    plat:[],
                    channel:'',
                    chatType:'',
                    gameServerID:'',
                    rawGameServerID:'',
                    roleName:'',
                    rangeTime:[],
                    roleID:'',
                    userAccount:'',
                    openLevel:false,
                    rangeLevel:[100,200]
                },
                rawOptionData:{
                    platAndChannel:{},
                    serverIDs:{},
                    rawServerIDs:{},
                    lvMax:1000,
                    lvMin:0,
                },
            }
        },
        computed:{
            optionPlat(){
                return this.optionData.plat;
            },
            optionChannel(){
                // 数据格式 {value:'s00/s01',alias:'官方买量/s01渠道'}
                let selectPlats = this.filterData.plat ;
                if(0 === selectPlats.length){
                    return [] ;
                }
                let temp = [] ;
                let optionChannel = this.optionData.channel;
                for(let itemPlat of selectPlats){
                    // 选择下的所有渠道，进行重新组装
                    let tempPlatName = '';
                    for (let tempPlat of this.optionData.plat ){
                        if( tempPlat.value === itemPlat ){
                            tempPlatName = tempPlat.alias ;
                            break;
                        }
                    }
                    for(let itemChannel of optionChannel[itemPlat]){
                        temp.push({value:itemPlat +'/'+ itemChannel.value,alias:tempPlatName+'/'+itemChannel.alias})
                    }
                }
                return temp ;
            },
            optionLevMin(){
                // console('mixLl:'this.optionData.level.min);
                return this.optionData.level.min;
            },
            optionLevMax(){
                return this.optionData.level.max;
            },
        },
        methods:{
            getSelectTime(time){
                this.filterData.rangeTime = time
            },
            format(val){
                return '等级范围取值 ' + val + " 级";
            },

            /**
             * 获取原始数据
             */
            getOptionData(){
                this.$API.POST('/detail/chatLogs/options').then(({data})=>{
                    this.rawOptionData = data;
                })
            },
            buttonClick(){
                this.$emit('isclick');
            },
            /**
             * 处理获取的选项数据
             * @returns {{plat: Array, channel, servers, rawServers, level: {min: ({}|rawOptionData.lvMin), max: ({}|rawOptionData.lvMax)}}}
             */
            handleOptionData(){
                // 平台的格式为 [ {value:'s00',alias:'官方买量'},{value:'ms1',alias:'渠道融合'} ]
                let plats = [];
                Object.keys(this.rawOptionData.platAndChannel).map(function (val) {
                    // TODO 加载平台翻译
                    plats.push({value:val,alias:val+'平台'})
                });
                let channels = {};
                let servers = {};
                let rawServers = {};
                // 渠道格式为 {s00:[{value:'s01',alias:'s01渠道'},{value:'s02',alias:'s02渠道'}] , ms1:[{value:'9',alias:'华为渠道'}] }
                for ( let plat in this.rawOptionData.platAndChannel){
                    channels[plat] = [];
                    for(let channel of this.rawOptionData.platAndChannel[plat]){
                        // TODO 加载渠道翻译
                        channels[plat].push({value:channel,alias:channel+'[渠道名]'});
                    }
                }
                for ( let plat in this.rawOptionData.serverIDs){
                    servers[plat] = [];

                    // TODO 对服务器ID进行排序
                    for(let server of this.rawOptionData.serverIDs[plat]){
                        // TODO 加载服务器别名翻译
                        servers[plat].push({value:server,alias:server+'[服务器]'});
                    }
                }

                // TODO 对服务器ID进行排序
                for ( let plat in this.rawOptionData.rawServerIDs){
                    rawServers[plat] = [];
                    for(let server of this.rawOptionData.rawServerIDs[plat]){
                        // TODO 加载服务器别名翻译
                        rawServers[plat].push({value:server,alias:server+'[原始服务器]'});
                    }
                }

                this.optionData = {plat:plats,channel:channels,servers:servers,rawServers:rawServers,level:{min:this.rawOptionData.lvMin, max:this.rawOptionData.lvMax,}};
            }


        },
        created:function () {
            this.getOptionData();
        },
        watch: {
            filterData: {
                handler(val,oldval){
                    this.$emit('sendDataEven',val);
                },
                deep:true,
            },
            rawOptionData: {
                handler(val,oldval){
                    this.handleOptionData();
                    // console.log(val)
                },
                deep:true,
            },

		}
	}
</script>

<style scoped>

</style>
