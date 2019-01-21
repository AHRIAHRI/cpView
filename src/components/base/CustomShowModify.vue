<template>
    <div>
        <Table :columns="table.columns" :data="table.data" :show-header="false">
            <template  slot-scope="{ row , index}" slot="isSelect">
                <i-switch v-model="table.data[index]['k3']"  @on-change="onClick"/>
            </template>
        </Table>
        <!--{{table.data}},-->
        <!--<div>选择的列表：{{final}}</div>-->
    </div>
</template>

<script>
	export default {
		name: "CustomShowModify",
        data(){
		    return {
                final:[],
		        abc:1,
                table:{
		            columns:[],
                    data:[],
                }
            }
        },
        // 必须为一个数组
        props:{
            value:Array,
        },
        created:function () {
            // 生成表单需要的数据
            this.table.columns = [
                {title:'#1',key:'k1',align:'center'},
                {title:'#2',key:'k2',align:'center'},
                {title:'#3',slot:'isSelect',align:'center'},
            ];
            let tempDataFormat = [];
            for(let item of this.value){
                tempDataFormat.push({k1:item[0],k2:item[1],k3:item[2]})
            }
            this.table.data = tempDataFormat;

        },
        methods:{
            onClick(){
                // 数据格式转化回来
                let finalData = [] ;
                for(let item of this.table.data){
                    finalData.push(Object.values(item));
                }
		        this.$emit('input',finalData);
                this.final = finalData;
                // console.log('this.final:'+this.final)
            },
        }
	}
</script>

<style scoped>

</style>
