<template>
  <div>
      <Row>
    <CustomData @sendTime="getSelectTime"></CustomData>
      <!--<loading :show="loadShow"></loading>-->
      {{datetime}}</Row>
  </div>

</template>


<script>

    export default {
		name: "three",
        data(){
		  return {
		      test:'router',
              datetime:'',
              // loadShow:true,
      }
    },
    methods:{
        getSelectTime(time){
                this.datetime = time ;
            }
        }
	}
</script>

