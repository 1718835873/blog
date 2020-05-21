<template>
  <div class="success">
    <div class="success-wrap" v-if="isSuccess">
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default{
    name:"DailogSuccess",
    props:{
      msg:String,
      isSuccess:Boolean
    }
  }
</script>

<style scoped="scoped">
  .success-wrap{
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: white;
    font-weight: bold;
    background-color: green;
    box-shadow: 1px 2px 4px green;
  }
</style>
