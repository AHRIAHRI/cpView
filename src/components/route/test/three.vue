<template>
  <div>
      <Row>
    <CustomData @send_time="getSelectTime"></CustomData>
      <!--<loading :show="loadShow"></loading>-->
      {{datetime}}</Row>
      <Button @click="buttonClick1">按钮{{values}}</Button>
  </div>

</template>


<script>

    export default {
        name: "three",
        data() {
            return {
                test: 'router',
                datetime: '',
                values: "",
                // loadShow:true,
            }
        },
        methods: {
            getSelectTime(time) {
                this.datetime = time;
            }
            ,
            buttonClick1() {
                this.values = 'liaoxiaotao';
                console.log(this.values);
            }
        }
    }
</script>

