<template>
    <div style="width: 60%;margin: auto">
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
                <Slider :disabled="!filterData.openLevel" :min="optionData.level.min" :max="optionData.level.max" v-model="filterData.rangeLevel"  :tip-format="format" range></Slider>
            </FormItem>
            <!--<FormItem>-->
                <!--<Button type="success" ghost long>加入过滤</Button>-->
            <!--</FormItem>-->

            <!--</div>-->
            <slot name="otherOption"></slot>

        </Form>
    </div>
</template>

<script>
	export default {
		name: "CustomFilter",
        data(){
		    return {
                switchStatus:false,
                filterData:{
                    plat:'',
                    channel:'',
                    chatType:'',
                    gameServerID:'',
                    rawGameServerID:'',
                    roleName:'',
                    rangeTime:[],
                    roleID:'',
                    userAccount:'',
                    openLevel:false,
                    rangeLevel:[100,900],
                },
            }
        },
        // 选项，需要从父组件中传递
        props:{
		    optionData:{
		        type:Object,
                default:{
                    plat:[],
                    channel:[],
                    level:{
                        min:1,
                        max:1000,
                    }
                }
            }
        },
        methods:{
            getSelectTime(time){
                this.filterData.rangeTime = time
            },
            format(val){
                return '等级范围取值 ' + val + " 级";
            },
        },
        computed:{

        },
        watch: {
            filterData: {
                handler(val,oldval){
                    this.$emit('sendDataEven',val);
                },
                deep:true,
            }

		}
                // console.log(val);



	}
</script>

<style scoped>

</style>
