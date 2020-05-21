import Vue from 'vue'
import Router from 'vue-router'

import Index from "../views/index.vue"
import Login from "../views/login.vue"
import Register from "../views/register.vue"
import ForgetPwd from "../views/forgetPwd.vue"
import UserIndex from "../views/userIndex.vue"
import Detail from "../views/detail.vue"
import Editor from "../views/editor.vue"
import Add from "../views/add.vue"
import UpLoadAvatar from "../views/upLoadAvatar.vue"

Vue.use(Router)

export default new Router({
  mode:"history",
  routes:[
    {
      path: '/home',
      component: Index,
      meta: {allowBack: false} ,
    },
  	{
  		path:"/",
  		name:"Index",
  		component:Index
  	},
  	{
  		path:"/login",
  		name:"Login",
  		component:Login
  	},
  	{
  		path:"/register",
  		name:"Register",
  		component:Register
  	},
  	{
  		path:"/forgetPwd",
  		name:"ForgetPwd",
  		component:ForgetPwd
  	},
  	{
  		path:"/userIndex",
  		name:"UserIndex",
  		component:UserIndex
  	},
    {
    	path:"/detail/:id",
    	name:"Detail",
    	component:Detail
    },
  	{
  		path:"/editor/:id",
  		name:"Editor",
  		component:Editor
  	},
  	{
  		path:"/add",
  		name:"Add",
  		component:Add
  	},
    {
    	path:"/upLoadAvatar",
    	name:"UpLoadAvatar",
    	component:UpLoadAvatar
    }
  ]
})
