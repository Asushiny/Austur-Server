const UserSign = require('../models/UserSignModel')
//插件
const jwt = require('jsonwebtoken')
//用户信息
const UserInformation = async ctx => {
	const {
		token
	} = ctx.header;
	//解析token
	let userdata = jwt.verify(token, 'austur-server-jwt', function(err, data) {
		if (err) {
			console.log('token无效',err);
		} else {
			// console.log(data.username);
			return data.username
		}
	})
	//判断客户端传过来的username参数 是否可以匹配到数据库里存储的数据
	const findResult = await UserSign.findOne({
		username:userdata,
	})
	// console.log('data',findResult);
	// 匹配到了进行判断密码
	if (findResult) {
		ctx.body = {
			status: 200,
			msg: '验证成功',
			data: findResult
		}
	} else {
		ctx.body = {
			status: 400,
			msg: '信息错误'
		}
	}
}

module.exports = {
	UserInformation
}
