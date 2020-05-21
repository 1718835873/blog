<template>
  <div class="avatar">
    <!-- /action="http://localhost:3000/upload" -->
    <form  method="POST" enctype="multipart/form-data" class="form"  name="fileInfo">
      <input type="file" name="file" multiple="multiple" accept="image/gif, image/jpeg, image/png"/>
      <input type="button" value="提交" @click="upload">
    </form>
  </div>
</template>

<script>
  export default{
    name:"UpLoadAvatar",
    methods:{
      upload(){
         let formData = new FormData();
         formData.append("file",$("input[name='file']")[0].files[0]);
         console.log(formData.get('file'));
        $.ajax({
          url:"http://localhost:3000/upload",
          type:"POST",
          data:formData,
          processData: false,  // 不处理数据
          contentType: false,
          success:res=>{
            console.log(res)
            if(res.code==200){
              let data=JSON.parse(localStorage.userInfo);
              console.log(data)
              data.imgUrl=res.imgurl
              console.log(data)
              window.localStorage.setItem("userInfo",JSON.stringify(data))
              this.$router.push({path:"/userIndex"})

            }
          },
          error:err=>{
            console.log(err)
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .avatar{
    width: 100%;
    height: 100vh;
    background-color: #A5D1ED;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form{
    background-color: white;
    height: 50px;
    line-height: 50px;
    padding: 0px 14px;
    border-radius: 10px;
  }
</style>
