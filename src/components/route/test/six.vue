<template>
    <div>.
        <CustomFilter :optionData="optionDataTemp" @sendDataEven="selectDataEven">
            <template slot="otherOption">
                <!--在组件中添加额外的选项-->
            <FormItem>
                <Select v-model="filterData.chatType" placeholder="聊天类型" filterable multiple style="width: 100%">
                    <Option v-for="item in optionData.chatType" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
            </FormItem>
            </template>
        </CustomFilter>
        {{selectData}}
    </div>
</template>

<script>
	export default {
		name: "six",
        data(){
		    return {
		        start:20,
                selectData:{},
                filterData:{
                    chatType:'',
                },
                optionData:{
                    chatType:'',
                },
                optionDataTemp:{
                    plat:[],
                    channel:[],
                    level:{
                        min:1,
                        max:1000,
                    }
                },
            }
        },
        created:function () {
            this.$API.POST('/sys/plat/allPlat').then(({data})=>{
                // 拿到数据之后 ，前端来组装
                // console.log(data)
                // 渠道号,platAndChannel 的key，然后拼接起来翻译的alias
                // 计算属性中计算出 channel 和平台号，
                // server id 同理，需要排序
            });
            console.log('aaaaaaaaa');
            console.log(this.$Util.render.query([{a:1,b:'shopby',c:3},{a:'111',b:'fromItem',c:'bbbbbbbbbbbb'}]))
        },
        methods:{
            selectDataEven(val){
                this.selectData = val;
            }
        }

	}
</script>

<style scoped>

</style>
