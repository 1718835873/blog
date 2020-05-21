<template>
	<div class="editor">
		<div class="top">
			<p >
				<span class="iconfont icon-zuojiantou" @click="goBack"></span> &nbsp;&nbsp;&nbsp;
				<span>文章详情</span>
			</p>
		</div>
    <div class="container">
      <p class="title">{{detail.title}}</p>
      <p class="content" v-html="detail.content"></p>
      <p class="footer">
        <span class="iconfont icon-biaoqian"> {{detail.tag}}</span>&nbsp;&nbsp;
        <span class="iconfont icon-shijian"> {{detail.create_time|timeFormat(detail.create_time)}}</span>&nbsp;&nbsp;
        <span class="iconfont icon-zuozhe"> {{detail.nickname}}</span>&nbsp;&nbsp;
        <span class="iconfont icon-dianzan" @click="zan(detail.articleId,love)"> {{love}}</span>&nbsp;&nbsp;
      </p>
    </div>

	</div>
</template>

<script>
	import WangEditor from "../components/wangEditor.vue"
	export default{
		name:"Add",
    filters:{
      timeFormat(value){
        var now_date=new Date(value);
        return now_date.toLocaleDateString().split("/").join("-")
      }
    },
		components:{
			WangEditor
		},
    data(){
      return{
        articleId:"",
        detail:[],
        love:""
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      // 点赞功能
      zan(id,love){
        // console.log("我是id",id)
        // console.log("我是Love",love)
        let url="http://localhost:3000/love?id="+id;
        $.ajax({
          url:url,
          type:"GET",
          data:{
            love:love
          },
          success:res=>{
            this.love=res.love
          },
          error:err=>{
            console.log(err)
          }
        })
      }
    },
    mounted() {
      let id=this.$route.params.id
      this.articleId=id
      let url="http://localhost:3000/getDetail?id="+id
      console.log("id",id)
      console.log("url",url)
      $.ajax({
        url:url,
        type:"GET",
        success:res=>{
          console.log(res)
          this.detail=res.data[0]
          this.love=res.data[0].love
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
  .container{
      width: 1220px;
      margin: 60px auto;
   }
   .title{
     font-size: 16px;
     font-weight: bold;
     text-align: center;
     text-shadow: 1px 2px 3px #C0C0C0;
   }
   .footer{
     text-align: center;
     margin-top: 20px;
     color: #00B7FF;
   }
   .content{
     line-height: 30px;
     text-indent: 2em;
   }
</style>
