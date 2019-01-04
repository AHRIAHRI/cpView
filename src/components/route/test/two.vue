<template>
  <div>
      <!--<DatePicker v-model="datetime" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>-->
      <!--{{datetime}}-->
      <Loading :show="loadShow"></Loading>
  </div>

</template>

<script>
    export default {
		name: "two",
        data(){
		  return {
		      test:'router',
              local:localStorage.getItem("token"),
              datetime:'',
              loadShow:true,
      }
    },
    methods:{
      abc: function(){
        this.$router.push('/login')
      }
    }
	}
</script>

