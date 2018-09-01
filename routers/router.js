const Router = require("koa-router")
// 拿到操作user表
const user = require("../control/user")

const router = new Router

// 主页面
router.get("/",async(ctx) => {
    await ctx.render("index",{
        title: "告白 — 触动心弦"
    })
})

//处理用户登录 用户注册
router.get(/^\/user\/(?=reg|login)/,async(ctx) => {
    // show为true则显示注册 false 显示登录
    const show = /reg$/.test(ctx.path)
    await ctx.render("register",{
        show
    })
})


//处理用户注册
router.post("/user/reg",user.reg)

//处理用户登录
router.post("/user/login",user.login)

module.exports = router