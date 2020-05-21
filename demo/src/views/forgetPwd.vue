<template>
	<div class="login">
		<div class="container">
			<form action="" class="area-info">
				<table>
					<tr>
						<td><span class="iconfont icon-mima"></span> &nbsp;新密码:</td>
						<td><input type="text" value="" /></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-yanzhengma"></span> &nbsp;验证码:</td>
						<td><input type="password" value="" /></td>
					</tr>
					<tr>
						<td colspan="2" class="set-code-type"><a href="">{{code}}</a></td>
					</tr>
					<tr>
						<td colspan="2">
							<input type="submit" value="修改密码" />
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		name:"ForgetPwd",
    data(){
      return{
        code:""
      }
    },
		methods:{
			
		}
	}
</script>

<style scoped="scoped">
	.login{
		position: fixed;
		top: 0px;
		left: 0px;
		bottom: 0px;
		width: 100%;
		height: 100%;
		background-color: #A5D1ED;
	}
	.container{
		/* background-color: white; */
		width: 500px;
		margin: 100px auto;
	}
	.area-info{
		border-radius: 20px;
		background-color: white;
		padding: 20px;
	}
	tr{
		height: 50px;
		line-height: 50px;
	}
	table{
		margin: 0px auto;
	}
	.iconfont{
		color: #00B7FF;
	}
	tr:last-child{
		text-align: center;
	}
	input[type="submit"]{
		width: 80px;
		height: 30px;
		border: 0px;
		background-color:  #00B7FF;
		border-radius: 8px;
		color: white;
		outline: none;
	}
  .set-code-type{
    text-align: center;
  }
  .set-code-type a{
    color: #228B22;
    letter-spacing: 4px;
    text-decoration: none;
  }

</style>
