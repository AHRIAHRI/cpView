<template>
    <div>
        <Modal v-model="isShow" width="80%" :closable="false" :mask-closable="false" :scrollable="true" stripe>
            <p slot="header" style="color:#19be6b;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="width:80%;margin:auto" >
                <Table border  :columns="data.columns" :data="data.data"></Table>
            </div>
            <div slot="footer" style="width:80%;margin:auto" >
                <Button type="success" long  @click="myclick">{{footerName}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
	export default {
		name: "CustomModelShowTable",
        data(){
		    return {
		        data1:'',
            }
        },
        props:{
		    title:String,
		    isShow:Boolean,
            data:Object,
            footerName:String,
        },
        methods:{
		    myclick(){
                this.$emit('closeModel');
            }
        }
	}
</script>

<style scoped>

</style>
