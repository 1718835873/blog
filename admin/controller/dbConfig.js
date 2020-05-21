const mysql =require("mysql");

module.exports={
	dbInfo:{
		host:"localhost",
		user:"root",
		password:"",
		database:"test_blog"
	},
	dbConn:function(sql,sqlArr,callBack){
		let pool = mysql.createPool(this.dbInfo)
		pool.getConnection((err,conn)=>{
			if(err){
				console.log(err)
				return
			}
			conn.query(sql,sqlArr,callBack);
			conn.release()
		})
	}
	
}