const Router = require("koa-router")
const router = new Router()

let obj =
router.get("/",async(ctx) => {
    await ctx.render("index",{
        title: "告白 —— 触动你的心弦 "
    })
})

router.get(/^\/user\/(?=reg|login)/,async(ctx) => {
    const show = /reg$/.test(ctx.path)
    await ctx.render("register",{
        show
    })
})
module.exports = router