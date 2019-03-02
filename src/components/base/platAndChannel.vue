<template>
    <div>
        <Table :columns="columns" border :data="data" :disabled-hover="true" >
            <template  slot-scope="{ row , index}" slot="platName">
                {{row.platName}}(全平台)&nbsp<i-switch v-model="data[index]['allow']" :disabled="projectDisabled" @on-change="onclick"/>
            </template>
            <template  slot-scope="{ row , index}" slot="slot-1">
                <div v-for = "(value, key, index2) in data[index].channels">
                    <Divider >{{data[index].channels[key].channel}} : <i-switch v-model="data[index].channels[key].allow" @on-change="onclick" :disabled="projectDisabled ? true : data[index]['allow']" /></Divider>
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
                projectDisabled:false,
                columns:[
                    {title:'平台',slot:'platName',maxWidth:200 ,align:'center'},
                    {title:'渠道',slot:'slot-1',},
                ],
            }
        },
        props:{
		    value:Array,
        },
        computed:{
		    getpro:()=> this.projectDisabled,
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
            },
            getprojectDisabled(data){
                this.projectDisabled = data;
                // console.log(getpro);
            }

        }
	}
</script>

<style scoped>

</style>
