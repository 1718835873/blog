<template>
	<div class="index-area">

		<div class="container">
			<Header :hasLogin="isLogin" @func="login" @outin="outin"></Header>
			<AsideAuthor :authors="authors" @author="toAuthor" @all="all"></AsideAuthor>
			<div class="right-area">
				<AuthorGroup :articles="articles" @func="getAllArticle"></AuthorGroup>
			</div>
		</div>

	</div>
</template>

<script>
	import Header from "@/components/header.vue"
	import AsideAuthor from "@/components/asideAuthor.vue"
	import AuthorGroup from "@/components/authorGroup.vue"
	export default{
		name:"Index",
		data(){
			return{
				isLogin:true,
        authors:[],
        articles:[]
			}
		},
    
    mounted() {
      // 获取作者信息
      $.ajax({
        url:"http://localhost:3000/author",
        type:"GET",
        success:res=>{
          console.log(res)
          this.authors=res.data
        },
        error:err=>{
          console.log(err)
        }
      })

      //获取所有文章列表
      $.ajax({
        url:"http://localhost:3000/allArticle",
        type:"GET",
        success:res=>{
          this.articles=res.data
        },
        error:err=>{
          console.log(err)
        }
      })
    },
		components:{
			Header,
			AsideAuthor,
			AuthorGroup
		},
    methods:{
      login(){
        this.$router.push({
          path:"/login"
        })
      },
      // 退出登录
      outin(){
        this.$router.push({
          path:"/login"
        })
      },
      getAllArticle(data){
        let articleId=data.articleId;
        let path="/detail/"+articleId
        this.$router.push({
          path:path
        })
      },
      toAuthor(data){
        let nickname=data.nickname;
        // 根据作者名字获取文章列表
         let url="http://localhost:3000/allArticleByName?nickname="+nickname;
         $.ajax({
           url:url,
           type:"GET",
           success:res=>{
             this.articles=res.data
           },
           error:err=>{
             console.log(err)
           }
         })
      },
      all(){
        //获取所有文章列表
        $.ajax({
          url:"http://localhost:3000/allArticle",
          type:"GET",
          success:res=>{
            this.articles=res.data
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
	.container{
		width: 1320px;
		margin: 60px auto;
	}
	.right-area{
		margin-left: 180px;
	}
</style>
