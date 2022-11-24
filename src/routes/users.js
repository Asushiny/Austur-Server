const Router = require('koa-router');
const router = new Router({prefix:'/user'});
const {User,Register,Login}=require('../controllers/UserSign')
router.get('/',User)
router.post('/register',Register)	//注册
router.post('/login',Login)		//登录
const {UserInformation}=require('../controllers/UserInformation')
router.get('/userInformation',UserInformation)	//用户信息

module.exports=router