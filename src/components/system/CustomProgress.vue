<template>
    <div>
        <Progress :percent="percent" :status="active" :stroke-width="3"  hide-info />
    </div>
</template>

<script>
	export default {
		name: "CustomProgress",
        data(){
            return {
                start:0,
                percent:0,
                active:'normal',
            }
        },
        methods:{
		  startProgress(){
              this.percent = 0;
              this.active = 'active';
              let timer1 = setInterval(()=>{
                  if (this.percent >= 88 || this.isOk) {
                      clearInterval(timer1);
                      return false;
                  }
                  // 这里数值可能会溢出一点点，问题不大
                  if(this.percent >= 37 ){
                      this.percent = this.percent + 0.5;
                  }else{
                      this.percent = this.percent + 2;
                  }

              },100)
          }
        },
        created:function () {
		    this.startProgress();
        },
        props:{
            isOk:{type:Boolean,default:false}
        },
        watch:{
            isOk() {
                if (this.isOk) {
                    let result = this.percent % 10 ;
                    if( this.percent < 100 && result !== 0 ){
                        this.percent = this.percent - result + 10;
                    }
                    let timer2 = setInterval(() => {
                        if (this.percent >= 100) {
                            this.active = 'success';
                            clearInterval(timer2);
                            return false;
                        }

                        this.percent = this.percent + 10;

                    }, 10)
                }else{
                    this.startProgress();
                }
            }
        }
	}
</script>

<style scoped>

</style>
