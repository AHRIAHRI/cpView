<template>
  <div>
      <DatePicker v-model="datetime" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
    {{datetime}}
  </div>

</template>

<script>
    import Util  from '../../../mode/util';
	export default {
		name: "two",
    data(){
		  return {
		      test:'router',
              local:localStorage.getItem("token"),
              datetime:''
      }
    },
    methods:{
      abc: function(){
        this.$router.push('/login')
      }
    }
	}
</script>

<style scoped>

</style>
