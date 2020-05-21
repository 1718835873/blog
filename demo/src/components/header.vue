<template>
	<div class="header">
		<div class="contriner">
			<div class="left">
				Orange圈
			</div>
			<div class="right">
				<div class="login" v-if="hasLogin">
					<span class="iconfont icon-denglu1"></span>
					<a href="#" @click.stop="login">登录</a>
				</div>
				<div class="outin">
					<span class="iconfont icon-tuichu"></span>
					<a href="#" @click.stop="outin">退出</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Header",
		props:{
			hasLogin:{
				type:Boolean
			}
		},
		data(){
			return{

			}
		},
    methods:{
      login(){
        this.$emit("func")
      },
      outin(){
        this.$emit("outin")
      }
    }
	}
</script>

<style scoped="scoped">
	.header{
		height: 60px;
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: #A5D1ED;
	}
	.contriner{
		width: 1320px;
		height: 60px;
		margin: 0px auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left{
		color: white;
		font-size: 24px;
		font-weight: bold;
	}
	.right{
		display: flex;
		justify-content: space-between;
		width: 140px;
		text-align: right;
		color: white;
	}
	.right a{
		text-decoration: none;
		color: white;
		margin-left: 6px;
	}
</style>
