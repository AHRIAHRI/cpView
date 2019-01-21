<template>
    <div>
        <Modal v-model="isShow" width="80%" :closable="false"  stripe>
            <p slot="header" style="color:#19be6b;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="width:80%;margin:auto" >
                <Table border  :columns="data.columns" :data="data.data"></Table>
            </div>
            <div slot="footer" style="width:80%;margin:auto" >
            </div>
        </Modal>
    </div>
</template>

<script>
	export default {
		name: "CustomModelShowTable",
        data(){
		    return {
                title:'',
                isShow:false,
                data:{
                    columns:[],
                    data:[],
                },
            }
        },
        methods:{
            loadFatherData(val){
                this.isShow = val.isShow;
                this.title = val.title;
                this.data.data = val.data;
                this.data.columns = val.columns;
            }
        }
	}
</script>

<style scoped>

</style>
