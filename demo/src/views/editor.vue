<template>
	<div class="editor">
		<div class="top">
			<p>
				<span class="iconfont icon-zuojiantou"></span> &nbsp;&nbsp;&nbsp;
				<span>修改文章</span>
			</p>
		</div>
		<form action="" class="content-area">
			<table>
				<tr class="item">
					<td>文章标题</td>
					<td class="set-width"><input type="text" id="title" name="title" :value="title"></td>
				</tr>
				<tr>
					<td>文章内容</td>
					<td class="set-width">
            <WangEditor v-model="wangContent" class="set-wang" :isClear="isClear" @change="change"></WangEditor>
            <!-- <textarea :value="content" placeholder="" name="content" id="content"  /> -->
          </td>
				</tr>
				<tr>
					<td>文章标签</td>
					<td class="set-width"><input type="text" id="tag" name="tag" :value="tag"></td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: center;"><input type="button" value="修改文章"  @click="editor(articleId)"/></td>
				</tr>
			</table>
		</form>

	</div>
</template>

<script>
	import WangEditor from "../components/wangEditor.vue"
	export default{
		name:"Editor",
		components:{
			WangEditor
		},
    data(){
      return{
        title:"",
        content:"",
        tag:"",
        articleId:"",
        wangContent:"",
        isClear:false,
        detail:[]
      }
    },
    methods:{
      change(data){
        this.wangContent=data
      },
      editor(articleId){
        let title=$.trim($("#title").val())
        // let content=$.trim($("#content").val())
        let tag=$.trim($("#tag").val())
        
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
        if(title.length<1){
          alert("标题不能为空")
          return;
        }
        if(content.length<1){
          alert("博文内容不能为空")
          return;
        }
        if(tag.length<1){
          alert("标签不能为空")
          return;
        }
        let id=articleId;
        let url="http://localhost:3000/updateArticle?id="+id
        let data ={
          title,
          content,
          tag
        }
        $.ajax({
          url:url,
          type:"POST",
          data:data,
          success:res=>{
            console.log(res)
            if(res.code==200){
              alert(res.msg)
              this.$router.push({
                path:"/userIndex"
              })
            }
          },
          error:err=>{
            alert("修改博文失败")
          }
        })

      }
    },
    mounted() {
      let articleId=this.$route.params.id
      this.articleId=articleId;
      let url="http://localhost:3000/getDetail?id="+articleId
       $.ajax({
         url:url,
         type:"GET",
         success:res=>{
           console.log(res)
           this.title=res.data[0].title;
           this.content=res.data[0].content;
           this.tag=res.data[0].tag
           this.wangContent=res.data[0].content
         },
         error:err=>{
           console.log(err)
         }
       })


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
		z-index: 99;
		background-color: #A5D1ED;
	}
	.content-area{
		margin-top:80px;
		display: flex;
		/* align-items: center; */
		justify-content: center;
	}
  table{
    width: 1100px;
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
  textarea{
    width: 100%;
    height: 400px;
    resize: none;
    overflow: auto;
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
