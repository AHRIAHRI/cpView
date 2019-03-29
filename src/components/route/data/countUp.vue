<template>
    <div>
        <div v-show="fitleShow">
            <CountUpFilter :optionData="optionData" @on-click="hitClick" ></CountUpFilter>
            <Divider orientation="left"></Divider>
        </div>
        <CustomSelectTable :showTitle="showTitle" :showData = "showData" >
            <Tooltip content="打开过滤器" placement="top" ><Icon type="ios-apps-outline" @click="fitleShow = !fitleShow" /></Tooltip>
            </CustomSelectTable>
    </div>
</template>

<script>
	export default {
		name: "countUp",
        data(){
			return {
				fitleShow:false,
				optionData:{
					platAndChannel:[],
					rawServerIDs:[],
                },
				filter:{
					plat:'',
					channel:'',
					rawGameServerID:'',
					rangeTime:''
                },
				showTitle:[
					{
						title:'日期',
						key:'date',
						defalut:true,
						desc:'我不说你也懂吧 ！',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'left'
						}
					},

					{
						title:'总登录',
						key:'userLogin',
						defalut:true,
						desc:'登录人数',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'总充值',
						key:'rechargeTotal',
						defalut:true,
						desc:'',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'充值人数',
						key:'rechargePeople',
						defalut:true,
						desc:'总充值人数 [按角色]',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'登录ARPU',
						key:'loginARPU',
						defalut:true,
						desc:'[登录人均充值] 充值金额 / 登录人数',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'付费ARPU',
						key:'payARPU',
						defalut:true,
						desc:'充值金额 / 充值人数',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'活跃付费率',
						key:'activePayRate',
						defalut:true,
						desc:'充值人数 / 登录人数',
						otherOptions:{
							// width: 150,
							sortable: true,
						}
					},
					{
						title:'新增创角',
						key:'newAddCreaetRole',
						defalut:false,
						desc:'新增创角数',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},
					{
						title:'新增充值',
						key:'newAddRecharge',
						defalut:false,
						desc:'当天新增创角玩家当天充值金额',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},
					{
						title:'新增充值人数',
						key:'newAddRechargePeople',
						defalut:false,
						desc:'当天新创角玩家当天充值人数',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},
					{
						title:'新增付费ARPU',
						key:'newAddPayARPU',
						defalut:false,
						desc:'新增充值 / 新增充值人数',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},
					{
						title:'新增登录ARPU',
						key:'newAddLoginARPU',
						defalut:false,
						desc:'新增充值 / 新增创角',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},
					{
						title:'新增付费率',
						key:'newAddPayRate',
						defalut:false,
						desc:'新增充值人数 / 新增创角',
						otherOptions:{
							// width: 150,
							sortable: true,
							fixed: 'right'
						}
					},

                ],
                // 这里如果没有默认值 ，可能会引起异常
				showData:[
                    {}
                ],
            };
	        /**
             *
	         *
	         充值金额 	总充值金额
	         充值人数	总充值人数（按角色）
	         登录ARPU（登录人均充值）	充值金额/登录人数
	         活跃付费率	充值人数/登录人数
	         登录人数	登录人数（按角色）
	         老用户	非新创角登录用户数（登录人数-新增创角）
	         新增创角	新增创角数
	         新增充值	 当天新增创角玩家当天充值金额
	         新增充值人数	当天新创角玩家当天充值人数
	         新增付费ARPU 	新增充值/新增充值人数
	         新增登录ARPU	 新增充值/新增创角
	         新增付费率	新增充值人数/新增创角
	         最高在线	全游戏当天最高在线
	         平均在线	全游戏当天平均在线
	         付费ARPU	充值金额/充值人数
	         */

		},
		components:{
			CountUpFilter:()=>import('@/components/system/CountUpFilter'),
		},
        methods:{
	        hitClick(val){
	        	// console.log(JSON.stringify(val));
	        	// 点击之后开始请求数据
	        	// 数据回来之后 ，默认关闭
	        	this.fitleShow = false;
	        	// alert('ok');


                this.$Notice.success({
                    title: '您的选择为:',
                    desc: '',
	                duration:0,
                    render: h => {
                        return h('span', [
                        	h('div', '平台渠道'),
                        	h('div', '时间'),
                        	h('div', '游戏服'),
                        ])
                    }
                });

                this.getCountlyData(val)
            },
            getOption(){
	        	this.$API.POST('/data/countUp/options').then(({data}) =>{
	        		this.optionData = data ; })
            },
            getCountlyData(filter){
	            this.$API.POST('/data/countUp/data',{filter:filter}).then(({data}) => {
                        this.showData = data ;
                        // console.log(this.showData) ;
		            })
            }
        },
        mounted() {
			this.getOption();
			this.getCountlyData(this.filter)
        }
	}
</script>

<style scoped>

</style>