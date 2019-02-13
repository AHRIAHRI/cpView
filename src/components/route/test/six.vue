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
		    this.$API.POST('/test/six/test').then(({data})=>{
		        console.log(data)
            })
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
