const Koa = require("koa")
const static = require("koa-static")
const views = require("koa-views")
const router = require("./routers/router")
const logger = require("koa-logger")
const body = require("koa-body")
const { join } = require("path")

//生成Koa实例
const app = new Koa

//注册日志模块
//app.use(logger())
//配置koa-body处理post请求数据
app.use(body())
//配置静态资源目录
app.use(static(join(__dirname, "public")))
//配置视图模板
app.use(views(join(__dirname, "views"),{
    extension: "pug" //使用pug模板 语法
}))

//注册路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log("启动成功，监听端口为3000")
})