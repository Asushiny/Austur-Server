const UserSign = require('../models/UserSignModel')
//引入密码加密
const {
	passencrypt,
	passdecode
} = require('../bcrypt/index')
//插件
const jwt = require('jsonwebtoken')
const User = async ctx => {
	ctx.body = "我是User页面"
}
//注册
const Register = async ctx => {
	//在进行post路由配置的时候客户端利用data传参
	//  服务器端利用ctx.request.body接收传递的参数 
	const {
		username,
		password,
		admincode
	} = ctx.request.body;
	// 在数据库中进行查找和我们传递的username一样的数据
	const findResult = await UserSign.find({
		username
	})
	//如果查找到了，返回用户已经存在
	if(admincode != '' && admincode != 'asukksk'){
		ctx.body = {
			status: 400,
			msg: '管理员码错误!'
		}
	}
	else if (findResult.length) {
		ctx.body = {
			status: 401,
			msg: '注册失败,该用户已存在!'
		}
	} else {
		//密码加密
		ctx.request.body.password = passencrypt(password)
		//通过实例化之后的save方法 将数据存储到数据库
		//这里的await不可以丢弃 否则会存不到数据库里
		//注册成功的用户信息将返回到客户端
		ctx.body = await new UserSign(ctx.request.body).save();
	}
}
//登录
const Login = async ctx => {
	const {
		username,
		password
	} = ctx.request.body;
	//加密密码
	const encryptpassword = passencrypt(password)
	//判断客户端传过来的username参数 是否可以匹配到数据库里存储的数据
	const findResult = await UserSign.findOne({
		username,
		encryptpassword
	})
	// 匹配到了进行判断密码
	if (findResult) {
		//传递的对象    //token标识       //有效时长
		let token = jwt.sign(ctx.request.body, 'austur-server-jwt', {
			expiresIn: 3600 * 24 * 7
		})
		ctx.body = {
			status: 200,
			msg: '验证成功',
			token
		}
	} else {
		ctx.body = {
			status: 403,
			msg: '用户不存在'
		}
	}
}

module.exports = {
	User,
	Register,
	Login
}
