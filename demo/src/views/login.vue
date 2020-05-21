<template>
	<div class="login">
    <DailogErr :msg="msg" :isErr="isErr"></DailogErr>
    <DailogSuccess :msg="msg" :isSuccess="isSuccess"></DailogSuccess>
		<div class="container">

			<div class="area-info">
				<table>
					<tr>
						<td><span class="iconfont icon-xingmingyonghumingnicheng"></span> &nbsp;用户名:</td>
						<td><input type="text" id="username" name="username" style="width: 100%;" @focus="getFocus"/></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-mima"></span> &nbsp;密码:</td>
						<td><input type="password" id="pwd" name="pwd" style="width: 100%;"  @focus="getFocus"/></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-yanzhengma"></span> &nbsp;验证码:</td>
						<td class="code-wrap">
							<input type="text" class="code" id="code" style="width: 60%;"  @focus="getFocus">
							<img src="http://localhost:3000/captcha" @click="getCodeImg" class="getCode"/>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<input type="button" value="登录" @click="login($event)"/>
						</td>
					</tr>
				</table>
			</div>
			<div class="login-info">
				<div class="left">
					<router-link to="/register" tag="a">还没有账号?去注册</router-link>
				</div>
				<div class="right">
					<!-- <router-link to="/forgetPwd" tag="a">忘记密码</router-link> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import DailogErr from "../components/dailogErr.vue"
  import DailogSuccess from "../components/dailogSuccess.vue"
	export default{
		name:"Login",
    components:{
      DailogErr,
      DailogSuccess
    },
		data(){
			return{
				code:"",
        msg:"",
        isErr:false,
        isSuccess:false
			}
		},
		mounted() {
			$.ajax({
				url:"http://localhost:3000/captcha/session",
				type:"GET",
				success:res=>{
					this.code=res.code
				},
				error:err=>{
					console.log(err)
				}
			})
		},
		methods:{
			// 获取验证码中的数据
			getCode(){
				$.ajax({
					url:"http://localhost:3000/captcha/session",
					type:"GET",
					success:res=>{
						this.code=res.code
					},
					error:err=>{
						console.log(err)
					}
				})
			},
			async getCodeImg(event){
				event.target.setAttribute("src","http://localhost:3000/captcha?"+Math.random())
				await this.getCode();
			},
			login(){
				let username=$.trim($("#username").val());
				let pwd=$.trim($("#pwd").val());
				let code=$.trim($("#code").val());
				if(username.length==0){
          this.isErr=true
          this.msg="用户名不能为空"
          return false;
        }
        if(pwd.length==0){
          this.isErr=true
          this.msg="密码不能为空"
          return false;
        }
        if(code.length==0){
          this.isErr=true
          this.msg="验证码不能为空"
          return false;
        }
        if(code!=this.code){
          this.isErr=true
          this.msg="验证码出错"
          return false;
        }
        $.ajax({
          async:"false",
          dataType:"json",
          url:"http://localhost:3000/login",
          type:"POST",
          data:{
            username,
            pwd
          },
          success:res=>{
            console.log(res)
            if(res.code==400){
              this.msg=res.msg
              this.isErr=true
            }else if(res.code==200){
              this.msg=res.msg
              this.isSuccess=true
              // 从数据库中用户图片也获取出来
              let avatar=res.data.avatar
              console.log(res.data)
              window.localStorage.userInfo=JSON.stringify(res.data[0])
              this.$router.push({path:"/userIndex"})
            }
          },
          error:err=>{
            console.log(err)
            console.log("失败")
          }
        })
			},
      // 获取焦点
      getFocus(){
        this.isErr=false
      }
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
		/* line-height: 50px; */
		width: 100%;
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
	input[type="button"]{
		width: 80px;
		height: 30px;
		border: 0px;
		background-color:  #00B7FF;
		border-radius: 8px;
		color: white;
		outline: none;
	}
	.login-info{
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.login-info a{
		text-decoration: none;
		color: forestgreen;
		font-size: 13px;
	}
	.code{
		width: 30%;

	}
	.getCode{
		width:24%;
    text-align: left;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		vertical-align: middle;
	}
</style>
