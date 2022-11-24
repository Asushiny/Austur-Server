//用于连接数据库
//1、引入mongoose
const mongoose = require("mongoose");

module.exports = ()=>{
	//第一个参数为连接地址
	//第二个参数为配置项，当我们创建新的集合(表)时，如果数据库没有则会帮我们新建
	mongoose.connect('mongodb+srv://admin:T1FoQtj0kRcbOnsG@blogdatabase.gexedq9.mongodb.net/austur',{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
		console.log('数据库连接成功');
	}).catch(err=>{
		console.error('数据库连接失败',err);
	})
}