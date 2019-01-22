<template>
    <div>
        <Modal v-model="isShow" width="80%" :closable="false"  stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            {{data}}
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "changePlatChange",
        data(){
            return {
                title:'',
                isShow:true,
                data:{},
            }
        },
        methods:{
            loadFatherData(val){
                this.isShow = true ;
                this.data = val.data ;
                this.title = val.title ;
            },
            commitModify(){
                this.isShow = false;
            }
        }

    }
</script>

<style scoped>

</style>
