<template>
    <div>
        <Progress :percent="percent" status="active" :stroke-width="3"  hide-info />
    </div>
</template>

<script>
	export default {
		name: "CustomProgress",
        data(){
            return {
                start:0,
                percent:0,
            }
        },
        mounted:function () {
            this.percent = this.start;
            let timer1 = setInterval(()=>{
                this.percent = this.percent + 0.1;
                if (this.percent >= 80) {
                    clearInterval(timer1);
                    return false;
                }
            },1)
        },
        props:{
            isOk:{type:Boolean,default:false}
        },
        watch:{
            isOk(){

                let timer2 = setInterval(()=>{
                    this.percent = this.percent + 1;
                    if (this.percent >= 100) {
                        clearInterval(timer2);
                        return false;
                    }
                },1)
            }
        }
	}
</script>

<style scoped>

</style>
