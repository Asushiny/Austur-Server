var bcrypt = require('bcryptjs');
//密码加密
const passencrypt = (password) => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash
}
//参数1:客户端传递过来的密码 参数2: 数据库里匹配数据的加密密码
const passdecode = (password, passwordencrypt) => {
	return bcrypt.compareSync(password, passwordencrypt); // true
}
module.exports = {
	passencrypt,
	passdecode
}
