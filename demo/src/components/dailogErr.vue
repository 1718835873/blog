<template>
  <div class="err">
    <div class="err-wrap" v-if="isErr">
      {{msg}}
    </div>
  </div>
</template>

<script>
  export default{
    name:"DailogErr",
    props:{
      msg:String,
      isErr:Boolean
    }
  }
</script>

<style scoped="scoped">
  .err-wrap{
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: white;
    font-weight: bold;
    background-color: orangered;
    box-shadow: 1px 2px 4px orangered;
  }
</style>
