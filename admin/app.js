const db=require("./controller/dbConfig.js")
const express=require("express")
const app=express();
var cookie=require("cookie-parser")
let session=require("express-session")
 app.use(cookie())
 app.use(session({
     saveUninitialized:true,
     secret:"ergwe", 
     resave:false,
     rolling:true,
     cookie:{maxAge:30*60*1000*24} 
 }))


const fs=require("fs")
const path=require("path")
app.use("/static",express.static(path.join(__dirname,"/public")))

 
app.listen(3000,()=>{
	console.log("app start")
})
var svgCaptcha = require('svg-captcha');
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({
	extended:false
}))
const cors=require("cors")
app.use(cors())

// 引入手机号功能接口
const SMSClient = require('@alicloud/sms-sdk')
// 产生6位随机数
function getCode(){
	let str="";
	for(let i=0;i<6;i++){
		str+=parseInt(Math.random()*10)
	}
	return str;
}

const multer=require("multer");
app.use(multer({dest:"./public"}).array("file"))
 
app.post("/login",(req,res,next)=>{
	// res.send("hello world")
	const {username,pwd}=req.body
	let str=`select * from user where nickname=? and password=?`
	let sqlArr=[username,pwd]
	let callBack=function(err,data){
		if(err){
			console.log(err)
			return;
		}
		if(data.length !=1){
			console.log("密码或用户名出错")
			res.send({
				msg:"用户名或密码出错",
				code:400
			})
			return;
		}
		console.log("用户信息",data)
		var data=data
		global.userInfo=req.body
		res.send({
			msg:"成功登录",
			code:200,
			data:data
		})
		
	}
	db.dbConn(str,sqlArr,callBack)
})
// 验证码
app.get('/captcha', function (req, res,next) {
    var cap = svgCaptcha.create({
            size:4,
            ignoreChars:"0o1il",
            noise:1,
            background:"#f5f5f5",
            color:true,
            height:46,
						fontSize:60
        });
    req.session.captcha= cap.text.toLocaleLowerCase();
		// console.log(req.session.captcha)
		app.locals.code=cap.text.toLocaleLowerCase()
    res.type('svg');//响应类型
    res.send(cap.data);
		// next();
});
// 向前端传送验证码
app.get("/captcha/session",(req,res)=>{
	let code=app.locals.code
	console.log("code",code)
	res.json({"code":code})
})

// 登录成功，根据用户信息获取数据
app.get("/getuserdata",(req,res)=>{
	let nickname=req.query.nickname
	console.log(nickname)
	// console.log(userInfo.nickname)
	let sql="select * from article where nickname=?"
	let strArr=[nickname]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		console.log("data:",data)
		res.send({data:data,code:200})
	}
	db.dbConn(sql,strArr,callBack)
})
// 注册
app.post("/register",(req,res)=>{
	let nickname=req.body.username;
	let password=req.body.pwd;
	let state=1
	let sql="insert into user (nickname,password,state) values (?,?,?)";
	let sqlArr=[nickname,password,state]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		if(data.affectedRows==1){
			global.userInfo={nickname,password}
			res.send({
				msg:"注册成功",
				code:200,
				data:{nickname,password}
			})
		}
	}
	db.dbConn(sql,sqlArr,callBack)
})

// 手机号获取验证码
app.get("/getPhone",(req,res)=>{
	let str1=getCode();
	const phoneNum = req.query.phone
	console.log("手机号码",phoneNum)
	accessKeyId='LTAI4GDQnaPWePo1zPTwqzrU';
	secretAccessKey= '23TNKUDlPkaOYIqth6XzE4Qvrg6VBV';
	//初始化sms_client
	let smsClient = new SMSClient({accessKeyId, secretAccessKey});
	
	// 开始发送短信
	smsClient.sendSMS({
		PhoneNumbers:phoneNum,
		SignName:"smalldemo123",
		TemplateCode:	"SMS_190095026",
		TemplateParam:`{"code":'${str1}'}`,
	}).then(result=>{
		console.log("result",result)
		let {Code}=result;
		if(Code=='OK'){
			res.send({
				msg:"ok",
				code:str1
			})
			console.log(result)
		}
	}).catch(err=>{
		console.log(err)
		res.send({
			msg:"fail"
		})
	})
})

// 根据用户名判断用户是否被注册过
app.get("/getUserByName",(req,res)=>{
	let nickname=req.query.username;
	let sql="select * from user where nickname=?"
	let sqlArr=[nickname];
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		if(data.affectedRows==1){
			res.send({
				msg:"用户已经被注册过了",
				code:400
			})
		}
	}
	db.dbConn(sql,sqlArr,callBack)
	
})


// 获取博文作者
app.get("/author",(req,res)=>{
	let sql="select  * from user";
	let sqlArr=[];
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		res.send({
			msg:"获取成功",
			code:200,
			data:data
		})
	}
	db.dbConn(sql,sqlArr,callBack)
})
// 获取所有文章列表
app.get("/allArticle",(req,res)=>{
	let sql="select * from article";
	let sqlArr=[];
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return
		}
		// console.log(data);
		res.send({
			msg:"获取成功",
			code:200,
			data:data
		})
	}
	db.dbConn(sql,sqlArr,callBack)
})
// 根据作者名字获取文章列表
app.get("/allArticleByName",(req,res)=>{
	let nickname=req.query.nickname;
	let sql="select * from article where nickname=?";
	let sqlArr=[nickname]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return
		}
		res.send({
			msg:"获取成功",
			code:200,
			data:data
		})
	}
	db.dbConn(sql,sqlArr,callBack)
})

// 根据id获取数据
app.get("/getDetail",(req,res)=>{
	// let userInfo=global.userInfo;
	// console.log(userInfo)
	// console.log(userInfo.username)
	// console.log(req,params)
	let id=req.query.id;
	// console.log(req,params)
	console.log("id",id)
	let sql="select * from article where articleId=?"
	let strArr=[id]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		res.send({data:data,code:200})
	}
	db.dbConn(sql,strArr,callBack)
})
app.post("/upload",(req,res)=>{
		let userInfo=global.userInfo;
		// console.log("个人信息",userInfo)
	if(req.files.length>0){
		let file=req.files[0]
		let mime=file.mimetype.split("/")
		fs.renameSync("./public/"+file.filename,"./public/"+file.filename+"."+mime[1])
		let newName="http://localhost:3000/static/"+file.filename+"."+mime[1]
		// console.log("新名字",newName)
		let sql="update user set avatar=? where nickname=?"
		let sqlArr=[newName,userInfo.username]
		let callBack=(err,data)=>{
			if(err){
				console.log(err)
				return
			}
			console.log(data)
			res.send({
				imgurl:newName,
				msg:"头像上传成功",
				code:200
			})
		}
		db.dbConn(sql,sqlArr,callBack)
	}else{
		
	}
	
	
})

app.get("/userInfo",(req,res)=>{
	let userInfo=global.userInfo;
	console.log("userInfo",userInfo)
	let str="select * from user where nickname=?"
	let sqlArr=[userInfo.username]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		console.log(data)
		res.send({
			userInfo:data,
			code:200
		})
	}
	db.dbConn(str.sqlArr,callBack)
})
// 添加文章
app.post("/addAticle",(req,res)=>{
	let title=req.body.title;
	let content=req.body.content;
	let create_time=new Date();
	let love=req.body.like;
	let tag=req.body.tag
	let userId=req.body.userId;
	console.log(userId)
	let nickname=req.body.nickname;
	let sql="insert into article (userId,title,content,create_time,love,tag,nickname) values (?,?,?,?,?,?,?)";
	let sqlArr=[userId,title,content,create_time,love,tag,nickname]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return
		}
		console.log(data)
		if(data.affectedRows==1){
			res.send({
				msg:"添加文章成功",
				code:200
			})
		}
	}
	db.dbConn(sql,sqlArr,callBack)
})


// 删除文章
app.get("/del",(req,res)=>{
	let articleId=req.query.id;
	console.log("articleId",articleId)
	let sql="delete from article where articleId=?"
	let sqlArr=[articleId]
	let callBack=(err,data)=>{
		if(err){
			console.log("出错了")
			return
		}
		console.log("删除的数据信息",data)
		if(data.affectedRows==1){
			res.send({
				msg:"删除博文成功",
				code:200
			})
		}else{
			res.send({
				msg:"删除博文失败",
				code:400
			})
		}
	}
	db.dbConn(sql,sqlArr,callBack)
})

// 更新文章
app.post("/updateArticle",(req,res)=>{
	let id=req.query.id;
	let title=req.body.title;
	let content=req.body.content;
	let tag=req.body.tag
	let sql="update article set title=?,content=?,tag=? where articleId=?"
	let sqlArr=[title,content,tag,id]
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		if(data.affectedRows==1){
			res.send({
				msg:"修改博文成功",
				code:200
			})
			
		}else{
			res.send({
				msg:"修改博文失败",
				code:400
			})
		}
	}
	db.dbConn(sql,sqlArr,callBack)
})
// 文章点赞
// app.get("/getzan",(req,res)=>{
// 	let articleId=req.query.id;
// 	let sql="select love from article where articleId=?"
	
// })
app.get("/love",(req,res)=>{
	
	console.log("hfashdfsadfas")
	let articleId=req.query.id;
	let love=parseInt(req.query.love)+1;
	console.log("req.query",req.query)
	console.log("love",love)
	let sql="update article set love = ? where articleId=?"
	let sqlArr=[love,articleId];
	let callBack=(err,data)=>{
		if(err){
			console.log(err)
			return;
		}
		if(data.affectedRows==1){
			res.send({
				love:love,
				code:200
			})
		}else{
			res.send({
				love:love,
				code:400
			})
		}
		
	}
	db.dbConn(sql,sqlArr,callBack)
})
