const mongoose = require('mongoose');
//将 Schema model 解构出来
const {
	Schema,
	model
} = mongoose;
//创建数据模型 
// type:数据类型
// default:默认值
// required:是否必填
// select:是否在返回数据里面进行显示
const UserSignSchema = new Schema({
	__v: {
		type: String,
		select: false
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	admincode: {//管理码，只有管理码存在才可以进行后台操作
		type: String,
		default: ''
	},
	nikename: {//注册用户默认的昵称
		type: String,
		default: 'AUser'
	},
	userImg: {//注册用户默认的头像
		type: String,
		default: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
	},
	date: {// 注册时间
		type: Date,
		default: Date.now
	}, 
	
})
//连接的数据库里的文件名称
module.exports = model('UserSign', UserSignSchema)
