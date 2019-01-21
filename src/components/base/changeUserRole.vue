<template>
    <div>
        <Modal v-model="isShow" width="60%" :closable="false"  stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="width:80%;margin:auto" >
                <Table :columns="columns" border :data="arr" :disabled-hover="true">
                    <template slot-scope="{ row}" slot="slot-menuController" >
                        <strong>{{row.roleName}}</strong>
                    </template>
                    <template slot-scope="{ index }" slot="slot-menuSub" >
                        <i-switch v-model="arr[index].status" ></i-switch>
                    </template>

                </Table>
            </div>
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
	export default {
		name: "changeUserRole",
        data(){
		    return {
                isShow:false,
                columns:[
                    {slot:"slot-menuController",maxWidth:200,align:'center'},
                    {slot:"slot-menuSub",align:'center', },
                ],
                title:'二选一',
                arr:[], //selectName , selectStutus
                requestData:'',
            }
        },
        methods:{
		    loadFatherData(temp){
		        this.isShow = temp.isShow;
		        this.title = temp.title;
		        this.arr = temp.arr;
		        this.userInfo = temp.userInfo;
            },
            commitModify(){
		        this.$emit('commitModify',this.arr,this.userInfo);
                this.isShow = false;
            }
        }
	}
</script>

<style scoped>

</style>
