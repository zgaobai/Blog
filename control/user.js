const { db } =require("../Schema/config")
const UserSchema = require('../Schema/user')
const encrypt = require('../util/encrypt')

//通过 db 创建操作user数据库的模型对象
const User = db.model('users',UserSchema)
//用户注册
exports.reg = async ctx => {
    //用户注册 发过来的数据
    const user = ctx.request.body
    const username = user.username
    const password = user.password
    await new Promise((resolve, reject) => {
        User.find({username}, (err,data) => {
            if(err)return reject(err)
            //用户名已经存在 
            if(data.length !== 0){
                return resolve("")
            }
            //用户名不存在 则添加数据库 同时密码需要先加密
            const _user = new User({
                username,
                password: encrypt(password)
            })
            _user.save((err,data) => {
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            })
        })
    })
    .then(async data => {
        if(data){
            await ctx.render("isOk",{
                status: "注册成功"
            })
        }else{
            await ctx.render("isOk",{
                status: "用户已存在"
            })
        }
    })
    .catch(async error => {
        await ctx.render("isOk",{
            status: "注册失败，请重新注册"
        })
    })
}

//用户登录
exports.login = async ctx => {
    //用户注册 发过来的数据
    const user = ctx.request.body
    const username = user.username
    const password = user.password
    await new Promise((resolve, reject) => {
        User.find({username},(err, data) => {
            if(err)return reject(err)
            if(data.length === 0) return reject("用户名不存在")
            if(data[0].password === encrypt(password)){
                return resolve(data)
            }
            resolve('')
        })
    })
    .then(async data => {
        if(!data){
            return ctx.render("isOk",{
                status: "密码不正确，请重新登录"
            })
        }
        await ctx.render("isOk",{
            status: "登录成功"
        })
    })
    .catch(async err => {
        await ctx.render("isOk",{
            status: "登录失败"
        })
    })
}