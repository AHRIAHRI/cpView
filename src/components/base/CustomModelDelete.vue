<template>
    <div>
        <Modal v-model="deleteDate.isShow" width="60%" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{deleteDate.title}}</span>
            </p>
            <div style="text-align:center">
                {{deleteDate.data}}
            </div>
            <div slot="footer">
                    <Button type="error" style="width: 10%"  @click="del">{{deleteDate.footerName}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
	export default {
		name: "CustomModelDelete",
        data(){
		    return {
		        deleteDate:{
                    isShow:false,
                    title:'',
                    data:'',
                    footerName:'',
                    remoteAddr:'',
                }

            }
        },
        // props:{
        //     isShow:Boolean,
        //     title:String,
        //     data:String,
        //     footerName:String,
        //     remoteAddr:Array,
        // },
        created:function(){

        },
        methods:{
		    del(){
		        this.$emit('sureDelData',this.deleteDate.remoteAddr);
		        this.myclick();
            },
            myclick(){
                this.deleteDate.isShow = false ;
            },
            loadFatherData(val){
                this.deleteDate.isShow = val.isShow;
                this.deleteDate.title = val.title;
                this.deleteDate.data = val.data;
                this.deleteDate.footerName = val.footerName;
                this.deleteDate.remoteAddr = val.remoteAddr;
            }

        }
	}
</script>

<style scoped>

</style>
