<template>
    <div>
        <Modal v-model="isShow" width="80%" :closable="false"  stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="width:80%;margin:auto" >
                <Table :columns="columns" border :data="arr" :disabled-hover="true">
                    <template slot-scope="{ row }" slot="slot-menuController" >
                        <strong>{{row.menu}}</strong>
                    </template>
                    <template slot-scope="{ index }" slot="slot-menuSub" >
                        <CustomShowModify v-model="arr[index].subMenu" ></CustomShowModify>
                    </template>

                </Table>
            </div>
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>

        <!--<div><div>物品分析</div><i-switch v-model="switch1"></i-switch></div>-->
        <!--{{father.data}}-->

    </div>
</template>

<script>
	export default {
		name: "modelAuthorize",
        data(){
		    return {
                isShow:false,
                title:'',
                columns:[
                    {title:'类目',slot:"slot-menuController",maxWidth:200,align:'center'},
                    {title:'授权项目',slot:"slot-menuSub",align:'center', },
                ],
                arr:[],
            }
        },
        // props:{
        //     value:Array,
        // },
        // created:function () {
		 //    this.arr = this.value
        // },
        methods:{
		    // 父组件中调用方法
            loadFatherData(val){
                this.title = val.title ;
                this.arr = val.arr ;
                this.modifyObject = val.other ;
                this.isShow = true ;
            },
            commitModify(){
                // TODO 本地检测数据是否有变动，如果有就进行提交
                // 修改对象传出来,这里可能是修改角色权限,也可能是修改用户权限
                this.$emit('commitModify',this.arr,this.modifyObject);

                //传完之后关闭对话框
                this.isShow = false ;
            }

        },
        // watch:{
		 //    arr:function (val,oldVal) {
        //         this.$emit('input',val)
        //     }
        // }
	}
</script>

<style scoped>

</style>
