<template>
    <div style="width: 90%;margin: auto">
        <Form :model="filterData" slot="content" :label-width="80">
            <FormItem>
                <Select v-model="filterData.plat" placeholder="选择平台(不选为全部)" filterable multiple style="width: 50%">
                    <Option v-for="item in optionPlat" :value="item.value" :key="item.value">{{ item.alias }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="filterData.channel" placeholder="选择渠道(不选为全部)" filterable multiple style="width: 100%">
                    <Option v-for="item in optionChannel" :value="item.value" :key="item.value">{{ item.alias }}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Select v-model="filterData.rawGameServerID" multiple  placeholder="选择游戏服(不选为全部)">
                    <Option v-for="item in allServers" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <CustomDate @send_time="getSelectTime" />
            </FormItem>
            <FormItem>
                <Button type="success" ghost long @click="buttonClick">加入过滤</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
	export default {
		name: "CountUpFilter",
        data(){
			return{
				filterData:{
					plat:[],
					channel:[],
					rawGameServerID:[],
					rangeTime:'',
                }

            }
        },
        props:['optionData'],
		computed: {
			optionPlat() {
				// console.log('platAndChannel',this.optionData.platAndChannel);
                let temp = [];
				for(let items of Object.keys(this.optionData.platAndChannel)){
					temp.push({value:items,alias:items+'平台'})
                }
				return temp ;
			},
			optionChannel() {
				// 数据格式 {value:'s00/s01',alias:'官方买量/s01渠道'}
				let selectPlats = this.filterData.plat;
				if (0 === selectPlats.length) {
					return [];
				}
				let temp = [];
				// let optionChannel_1 = this.optionData.channel;
				for (let itemPlat of selectPlats) {
					// 选择下的所有渠道，进行重新组装
					let tempPlatName = '';
					for (let tempchannel of this.optionData.platAndChannel[itemPlat]) {
						temp.push({
							value: itemPlat + '/' + tempchannel,
							alias: itemPlat + '/' + tempchannel,
						})
					}
				}
				return temp;
			},
			allServers(){
				let temp = [];
				for (let key in this.optionData.rawServerIDs){
					if(this.$Util.arrayHas(this.filterData.plat,key)) {
						this.optionData.rawServerIDs[key].sort((a, b) => {
							return a - b
						}).map((values) => {
							temp.push({value: key + '/' + values, label: key + '/' + values + '[服]'})
						})
					}
                }
				// console.log(temp);
				return temp
            }
		},
        methods:{
	        getSelectTime(time){
		        this.filterData.rangeTime = time
	        },
	        buttonClick(){
	        	this.$emit('on-click',this.filterData)
            }
        },
        mounted() {
            // console.log('optionData',JSON.stringify(this.optionData))
		},
        // 防止用户在取消平台选项后，出现不是预期的请求，虽然服务器允许。所以直接重置了
		watch:{
		    'filterData.plat':function () {
			    this.filterData.channel = [];
			    this.filterData.rawGameServerID = [];
		    }
        }

	}
</script>

<style scoped>

</style>