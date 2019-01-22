<template>
    <div>
        <Table :columns="columns" border :data="data" :disabled-hover="true" >
            <template  slot-scope="{ row , index}" slot="platName">
                {{row.platName}}(全平台)&nbsp<i-switch v-model="data[index]['allow']" @on-change="onclick"/>
            </template>
            <template  slot-scope="{ row , index}" slot="slot-1">
                <div v-for = "(value, key, index2) in data[index].channels">
                    <Divider >{{data[index].channels[key].channel}} : <i-switch v-model="data[index].channels[key].allow" :disabled=" data[index]['allow']" /></Divider>
                </div>

            </template>

        </Table>
        <!--{{data}}-->
    </div>
</template>

<script>
	export default {
		name: "platAndChannel",
        data(){
		    return{
		        data: [],
                columns:[
                    {title:'平台',slot:'platName',maxWidth:200 ,align:'center'},
                    {title:'渠道',slot:'slot-1',align:'center'},
                ],
            }
        },
        props:{
		    value:Array,
        },
        beforeUpdate:function(){
            this.data = this.value ;
        },
        created:function(){
            this.data = this.value ;
        },
        watch:{
            value(){
                this.data = this.value ;
            }
        },
        methods:{
            onclick(){
                this.$emit('input',this.data)
            }
        }
	}
</script>

<style scoped>

</style>
