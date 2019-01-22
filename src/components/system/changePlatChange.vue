<template>
    <div>
        <Modal v-model="isShow" width="50%" :closable="false" stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
                <Table border :columns="table1.columns" :data="table1.data">
                    <template slot-scope="{ row }" slot="project">
                        <strong>{{ row.alias }}</strong>
                    </template>
                    <template slot-scope="{ index }" slot="plat">
                        <platAndChannel v-model="table1.data[index].plat"></platAndChannel>
                        <!--<Table border :columns="table2.columns" :show-header="false" :data="table1.data[index].plat"></Table>-->
                        <!--<template slot-scope="{row,index}" slot="table2-plat">-->
                            <!--<div>{{ row.platName }}</div>-->
                            <!--&lt;!&ndash;<i-switch v-model="table1.data[index].plat[index2].allow"  @on-change="onClick"/>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--</template>-->

                    </template>
                </Table>
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
		name: "changePlatChange",
        // components:{
        //     platAndChannel:()=>import('@/components/system/platAndChannel'),
        // },
        data(){
		    return {
                title:'',
                isShow:false,
                user:'',
                table1:{
                    columns:[
                        {title:'项目',slot:'project',maxWidth:100,align:'center'},
                        {title:'平台/渠道 授权(开启了平台就无需再选择渠道)',slot:'plat',align:'center'},
                    ],
                    data:[],
                },
                table2:{
                    columns:[
                        {slot:'table2-plat',maxWidth:500,align:'center'},
                        {slot:'table2-channel',align:'center'},
                    ],
                }
            }
        },
        methods:{
            loadFatherData(data){
		      this.table1.data = data;
            },
            commitModify(){
                this.isShow = false;
                this.$emit('commit',this.table1.data ,this.user)
            }
        }

	}
</script>

<style scoped>

</style>
