<template>
	<div class="index-area">

		<div class="container">
			<Header  :hasLogin="isLogin" @outin="outin"></Header>
			<div class="user-info">
				<div class="avatar">
					<img :src="imgUrl" alt="">
				</div>
				<div class="name">
					<p>{{username}}</p>
				</div>
				<p>
          <button class="upAvatar" @click="upload">上传头像</button>
        </p>
        <div class="left-add">
          <a href="#" @click.stop="add()">
            <span class="iconfont icon-tianjia"> &nbsp;添加</span>
          </a>
        </div>
				<!-- <Calendar></Calendar> -->
			</div>
			<div class="right-area">
				<div class="content-wrap" v-for="(item,index) in blog" :key="item.articleId">
					<div class="left-wrap" @click="detail(item.articleId)">
						<div class="top-wrap">
							<div class="title">{{item.title}}</div>
							<div class="title">{{item.create_time|timeFormat(item.create_time)}}</div>
							<div class="tag"> <span class="iconfont icon-biaoqian"></span> &nbsp; {{item.tag}}</div>
						</div>
						<div class="cont-wrap">
							<div class="cont">
								<div v-html="item.content" class="full-cont"></div>
							</div>
						</div>
						<div class="right-wrap">
							<div class="editor"><a href="#" @click.stop="editor(item.articleId)"><span class="iconfont icon-xiugai"> &nbsp;修改</span></a></div>
							<div class="editor"><a href="#" @click.stop="del(item.articleId)"><span class="iconfont icon-shanchu"> &nbsp;删除</span></a></div>

						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
  //防止页面后退
  // history.pushState(null, null, document.URL);
  // window.addEventListener('popstate', function () {
  // history.pushState(null, null, document.URL);
  // });
	import Header from "@/components/header.vue"

	// import Calendar from "@/components/calendar.vue"
	// import AuthorGroup from "@/components/authorGroup.vue"
	export default{
		name:"UserIndex",
		filters:{
			timeFormat(value){
        var now_date=new Date(value);
				return now_date.toLocaleDateString().split("/").join("-")
			}
		},
    methods:{
      upload(){
        this.$router.push({
          path:"/upLoadAvatar"
        })
      },
      detail(id){
        var articleId=id;
        console.log("articleId",articleId)
        let path="/detail/"+articleId
        this.$router.push({
          path:path
        })
      },
      // 编辑
      editor(id){
        var id=id
        var path="/editor/"+id
        this.$router.push({
          path:path
        })
      },
      // 删除
      del(id){
        var id=id
        console.log("我是要删除的文章Id",id)
        if(window.confirm("你确定要删除这篇博文吗?")){
          console.log("true")
          let url="http://localhost:3000/del?id="+id
          $.ajax({
            url:url,
            type:"GET",
            success:res=>{
              console.log("删除博文成功")
              if(res.code==200){
                this.$router.go(0)
              }

            },
            error:err=>{
              console.log("删除博文失败")
            }
          })
        }else{
          console.log("false")
        }
      },
      // 添加
      add(){
        this.$router.push({
          path:'/add'
        })
      },
      // 退出登录状态
      outin(){
        window.localStorage.userInfo=""
        this.$router.push({
          path:"/login"
        })
      }
    },
		data(){
			return{
				isLogin:false,
				money:22390,
        username:"",
        imgUrl:require("../assets/user-unlogin.png"),
        blog:[]
			}
		},
    mounted() {
      console.log(localStorage.getItem("userInfo"))
      let userInfo=JSON.parse(localStorage.getItem("userInfo"))
      console.log(userInfo)
      if(!userInfo ||userInfo.length==0){
        this.$router.push({path:"/login"})
      }else{
        if(userInfo.nickname){
          this.username=userInfo.nickname
        }
        if(!userInfo.imgUrl){

        }else{
          this.imgUrl=userInfo.imgUrl
        }
        console.log(this.imgUrl)
        console.log("成功")

        let url="http://localhost:3000/getuserdata?nickname="+this.username
        $.ajax({
          url:url,
          type:"GET",
          success:res=>{
            console.log("我为什么会出现undefined")
            console.log(res)
            this.blog=res.data
          },
          error:err=>{
            console.log(err)
          }
        })


      }
      // console.log(this.$route)
    },
		components:{
			Header,
		}
	}
</script>

<style scoped="scoped">
	.container{
		/* width: 1320px; */
		margin: 60px auto;
	}
	.right-area{
		margin-left: 220px;
	}
	.user-info{
		padding-top: 30px;
		position: fixed;
		top: 60px;
		width:220px;
		bottom: 0px;
		border-right: 1px dashed #C0C0C0;
		text-align: center;
	}
	.avatar img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.content-wrap{
		/* display: flex; */
		padding: 20px;
		border-bottom: 1px solid #c0c0c0;
	}
	.top-wrap{
		display: flex;
		flex-direction: row;
    line-height: 20px;
	}
	.top-wrap div{
		padding-right: 20px;
		font-size: 14px;
	}
	.cont{


    height: 70px;
    overflow: hidden;


	}
  .full-cont{
    line-height: 30px;
    text-indent: 2em;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient:vertical;
    flex-direction: column;
  }
	.right-wrap {
		display: flex;
		justify-content: flex-end;
	}
	.right-wrap a{
		padding: 4px 10px;
		text-decoration: none;
		color: #00A854;

	}
  .tag{
    font-size: 12px;
    line-height: 20px;
  }
	.icon-biaoqian{
		color: #00B7FF;
    font-size: 18px;
	}
  .upAvatar{

    border-radius: 4px;
    outline: none;
    /* font-size: 12px; */
  }
  .left-add{
    margin-top: 50px;
  }
  .left-add a{
    text-decoration: none;
    color: #228B22;
  }
</style>
