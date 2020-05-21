<template>
	<div class="editor">
		<div class="top">
			<p>
				<span class="iconfont icon-zuojiantou"></span> &nbsp;&nbsp;&nbsp;
				<span>添加文章</span>
			</p>
		</div>
		<form  class="content-area">
			<table>
				<tr class="item">
					<td>文章标题</td>
					<td class="set-width"><input type="text" name="title" id="title"></td>
				</tr>
				<tr>
					<td>文章内容</td>
					<td class="set-width"><WangEditor v-model="wangContent" class="set-wang" :isClear="isClear" @change="change"></WangEditor></td>
				</tr>
				<tr>
					<td>文章标签</td>
					<td class="set-width"><input type="text" name="tag" id="tag"></td>
				</tr>
				<tr>
					<td>发布时间</td>
					<td>{{new Date().toLocaleDateString().split("/").join("-")}}</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: center;"><input type="button" value="添加文章"  @click="add"/></td>
				</tr>
			</table>
		</form>

	</div>
</template>

<script>
	import WangEditor from "../components/wangEditor.vue"
	export default{
		name:"Add",
		components:{
			WangEditor
		},
    data(){
      return{
        wangContent:"",
        isClear:false
      }
    },
    methods:{
      change(data){
        this.wangContent=data
        console.log(data)
      },
      add(){
        let title=$.trim($("#title").val());
        let tag=$.trim($("#tag").val());
        if(title.length<1){
          alert("请输入文章标题");
          return;
        }
        if(tag.length<1){
          alert("请输入文章标签")
          return;
        }
        if(this.wangContent==="<p><br></p>"){
          alert("请输入文章内容")
          this.isClear=true;
          return
        }
        let content=this.wangContent;
        console.log(this.wangContent)
        if(this.wangContent.length<1){
          alert("请输入文章内容")
          return;
        }
        let now_date=new Date();
        let like=parseInt(0)
        let nickname=JSON.parse(localStorage.userInfo).nickname;
        let id=JSON.parse(localStorage.userInfo).id
        $.ajax({
          url:"http://localhost:3000/addAticle",
          type:"POST",
          data:{
            userId:id,
            title:title,
            content:content,
            nickname:nickname,
            like:like,
            tag:tag
          },
          success:res=>{
            if(res.code==200){
              alert(res.msg)
              this.$router.push({
                path:"/userIndex"
              })
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
	.top{
		width: 100%;
		position: fixed;
		top: 0px;
		color: white;
		padding-left: 20px;
		z-index: 99999;
		background-color: #A5D1ED;
	}
	.content-area{
		margin-top:80px;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
	.content-area table tr{
		height: 60px;
	}
	.set-width input{
		width: 100%;
	}
	.set-wang{
		width: 100%;
	}
	.item{
		padding-bottom: 20px;
	}
	input[type="submit"]{
		width: 100px;
		height: 30px;
		border: 0px;
		background-color:  #00B7FF;
		border-radius: 8px;
		color: white;
		outline: none;
		/* padding: 2px 18px; */
	}
</style>
