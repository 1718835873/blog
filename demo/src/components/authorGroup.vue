<template>
	<div class="author">
		<div class="wrap" v-for="(item,index) in articles" :key="item.articleId" @click="detail(item.articleId)">
			<div class="info">
				<div class="avatar">
					<img src="../assets/user-unlogin.png" alt="">
				</div>
				<div class="author-name">
					<p class="full-cont">{{item.nickname}}</p>
				</div>
			</div>
			<div class="article-info">
				<div class="title">
					<p><span class="iconfont icon-biaoqian"></span>{{item.title}}</p>
				</div>
				<div class="time">
					<p><span class="iconfont icon-shijian"></span>{{item.create_time|dateFormat(item.create_time)}}</p>
				</div>
			</div>
			<div class="cont-wrap">
				<div class="cont">
					<div v-html="item.content" class="full-cont"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"AuthorGroup",
    props:{
      articles:{
        type:Array
      }
    },
    filters:{
      dateFormat(value){
        let now_date=new Date(value);
        return now_date.toLocaleDateString().split("/").join("-")
      }
    },
    methods:{
      detail(id){
        var articleId=id;
        this.$emit("func",{articleId:articleId})
        // console.log("articleId",articleId)
        // let path="/detail/"+articleId
        // this.$router.push({
        //   path:path
        // })
      }
    }

	}
</script>

<style scoped="scoped">
	.author{
	}
	.wrap{
		border-bottom: 1px solid #c0c0c0;
		padding-left: 20px;
		padding-top: 20px;
	}
	.info{
		display: flex;
		align-items: center;
	}
	.avatar img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #f5f5f5;
	}
	.author-name{
		margin-left: 10px;
    overflow: hidden;
	}
	.article-info{
		display: flex;
		font-size: 13px;
	}
	.title{
		margin-right: 20px;
	}
	.iconfont{
		color: #00B7FF;
		margin-right: 0.375rem
	}
	.article{
		text-indent: 2em;
		line-height: 30px;
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
</style>
