<template>
	<div class="login">
		<div class="container">
			<form class="area-info">
				<table>
					<tr>
						<td><span class="iconfont icon-xingmingyonghumingnicheng"></span> &nbsp;用户名:</td>
						<td><input type="text" value="" id="username" /></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-mima"></span> &nbsp;密码:</td>
						<td><input type="password" value=""  id="pwd"/></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-shoujihao"></span> &nbsp;手机号:</td>
						<td><input type="text" value="" id="phone" /></td>
					</tr>
					<tr>
						<td><span class="iconfont icon-yanzhengma"></span> &nbsp;验证码:</td>
						<td class="code-wrap"><input type="text" class="code" id="code"><a href="#" id="getCode" class="getCode" @click="getCode">获取验证码</a></td>
					</tr>
					<tr>
						<td colspan="2">
							<input type="button" value="注册" @click="register" />
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Register",
    data(){
      return{
        code:""
      }
    },
		methods:{
      // 验证手机号
      checkPhone(value){
        let str=/^1[3456789]\d{9}/
        return str.test(value)
      },
			// 获取验证码
      getCode(){
        clearInterval(timer)
        let timer=null
        clearInterval(timer)
        let phone=$.trim($("#phone").val())
        if(phone.length<1){
          alert("请输入手机号")
          return;
        }
        if(!this.checkPhone(phone)){
          alert("请输入正确格式的手机号")
          return;
        }


        let url="http://localhost:3000/getPhone?phone="+phone
        console.log("url",url)
        $.ajax({
          url:url,
          type:"GET",
          success:res=>{
            console.log(res)
            this.code=res.code
            let second=60
            clearInterval(timer)
            timer=setInterval(()=>{
              second-=1;
              if(second<0){
                clearInterval(timer)
                second=0
                this.code=""
                  $("#getCode").text("发送验证码")
                  return
              }

              $("#getCode").text("剩余时间"+second)
            },1000)

            console.log(res)
          },
          error:err=>{
            console.log(err)
          }
        })
      },
      // 注册
      register(){
        let username=$.trim($("#username").val())
        let pwd=$.trim($("#pwd").val())
        // let phone=$.trim($("#phone").val())
        // let code=$.trim($("#code").val())

        if(username.length<1){
          alert("用户名不能为空.")
          return;
        }
        if(pwd.length<1){
          alert("密码不能为空.")
          return;
        }
        // if(phone.length<1){
        //   alert("手机号不能为空.")
        //   return;
        // }
        // if(code.length<1){
        //   alert("验证码不能为空.")
        //   return;
        // }
        // if(!this.checkPhone(phone)){
        //   alert("手机号格式不正确.")
        //   return;
        // }

        // if(code!=this.code){
        //   alert("你输入的验证码不正确.")
        //   return;
        // }
        let url="http://localhost:3000/getUserByName?username="+username
        $.ajax({
          url:url,
          type:"GET",
          success:res=>{
            if(res.code==400){
              alert(res.msg)
              return;
            }
          },
          error:err=>{
            console.log(err)
          }
        })
        let registerData={
          username:username,
          pwd:pwd
        }
        let url2="http://localhost:3000/register";
        $.ajax({
          url:url2,
          type:"POST",
          data:registerData,
          success:res=>{
            if(res.code==200){
              alert(res.msg)
              console.log("信息:",res.data)
              window.localStorage.userInfo=JSON.stringify(res.data)
              this.$router.push({
                path:"/userIndex"
              })
            }
          }
        })


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

	.code{
		width: 44%;
		display: inline-block;
		vertical-align: middle;
	}
	.getCode{
		width:32%;
		text-align: center;
		text-decoration: none;
		/* border: 1px solid #007AFF; */
		background-color: #00D1B2;
		color: white;
		display: inline-block;
		height: 24px;
		vertical-align: middle;
		line-height: 24px;
		font-size: 12px;
	}
</style>
