<template>
	<div class="aside">
		<div class="wrap">
			<div class="title">
				<span class="iconfont icon-daohanglan-02"></span>
				<span class="tag">本圈作者</span>
			</div>
			<div class="autor-group">
        <p @click="all" style="color: #909399;">全部</p>
				<ul>
					<li v-for="(item,index) in authors" :key="item.articleId"><a href="#" @click="toAuthor(item.nickname)">{{item.nickname}}</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"AsideAuthor",
    props:{
      authors:{
        type:Array
      }
    },
    methods:{
      toAuthor(nickname){
        this.$emit("author",{nickname:nickname})
      },
      all(){
        this.$emit("all")
      }
    }
	}
</script>

<style scoped="scoped">
	.aside{
		position: fixed;
		top: 60px;
		width: 180px;
		bottom: 0px;
		/* text-align: center; */
		border-right: 1px solid #C0C0C0;
	}
	.title {
		margin-top: 30px;
		color: #00B7FF;
	}
	.title .iconfont{
		font-weight: bold;
		font-size: 26px;
		color: #00B7FF;
	}
	.autor-group ul{
		list-style: none;
		padding: 0px;
	}
	.autor-group ul li{
		height: 40px;
		line-height: 30px;
	}
	.autor-group ul li a{
		text-decoration: none;
		color: #909399
	}
</style>
