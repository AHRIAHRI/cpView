<template>
    <div>
        <Modal v-model="isShow" width="60%" :closable="false" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="text-align:center">
                {{data}}
            </div>
            <div slot="footer">
                <Button type="success"  @click="myclick" style="width: 87%">不，这是我的误操作</Button>
                    <Button type="error" style="width: 11%"  @click="del">{{footerName}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
	export default {
		name: "CustomModelDelete",
        data(){
		    return {

            }
        },
        props:{
            isShow:Boolean,
            title:String,
            data:String,
            footerName:String,
            remoteAddr:Array,
        },
        methods:{
		    del(){
		        this.$emit('sureDelData',this.remoteAddr);
            },
            myclick(){
                this.$emit('closeModel');
            }
        }
	}
</script>

<style scoped>

</style>
