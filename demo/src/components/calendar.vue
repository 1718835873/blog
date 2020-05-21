<template>
	<div class="calendar">
		<div class="wrap-calendar">
			<ul>
				<li v-for="(item,index) in dateList" :key="index">{{item}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Calendar",
		data(){
			return{
				dateList:[]
			}
		},
		methods:{
			getCalendar(){
				let nowDate=new Date()
				console.log(nowDate)
				let dateArr=[]// eslint-disable-line no-unused-vars
				var nowyear=nowDate.getFullYear();// eslint-disable-line no-unused-vars
				var nowmonth=parseInt(nowDate.getMonth())+1;// eslint-disable-line no-unused-vars
				var nowday=nowDate.getDate();// eslint-disable-line no-unused-vars
				var nowweek=nowDate.getDay();// eslint-disable-line no-unused-vars
				console.log("星期",nowweek)
				let end=new Date(nowyear,nowmonth,0);// eslint-disable-line no-unused-vars
				console.log("结束",end)
				//这个月的总共天数
				let startWeek=new Date(nowyear,nowmonth-1,1).getDay()  // eslint-disable-line no-unused-vars
				//开始的第一天是星期几
				console.log(startWeek)
				// var i,j; // eslint-disable-line no-unused-vars
				// for(i=0; i <startWeek;i++){
				// 	dateArr.push("")
				// }
				// for(j=0;j<end;j++){
				// 	dateArr.push(j)
				// }
				console.log(dateArr)
				console.log("hahahdh")
			}
		},
		mounted() {
			this.getCalendar();
		}
	}
</script>

<style scoped="scoped">
	.wrap-calendar{
		width: 100%;
		background-color: #00B7FF;
	}
	ul{
		
		list-style: none;
		padding: 0px;
		display: flex;
		flex-wrap: wrap;
		padding: 10px 0px;
		
	}
	ul li{
		line-height: 40px;
		text-align: center;
		width: 14.2%;
		/* background-color: #00D1B2; */
	}
</style>
