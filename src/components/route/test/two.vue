<template>
  <div>
      <!--<DatePicker v-model="datetime" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>-->
      <!--{{datetime}}-->

    <!--{{menu}}-->
      <Button @click="test_store" type="error">加加加加加</Button>
      <hr>
      {{test1}}
  </div>

</template>

<script>
    import {menu} from "Config/game";

    export default {
		name: "two",
        data(){
		    return {
                test1:this.$Util.generateRouteComponents(),
            }
         },
        computed:{
            testStroe(){
                return this.$MyStore.state.code
            }
        },
        created:function () {

        },
        methods:{
            abc(){
                this.$router.push('/login')
                },
            test_store(){
                // this.$store.commit('increment');
                this.$MyStore.addCode();
            },
        }
	}
</script>

