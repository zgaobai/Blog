//连接数据库 导出 db Schema
const mongoose = require("mongoose")
const db = mongoose.createConnection("mongodb://localhost:27017/blog",
{useNewUrlParser: true})

//用原生promise 代替 mongoose 自实现的promise
mongoose.Promise = global.Promise

//把schema取出来
const Schema = mongoose.Schema

db.on("error",() => {

})

db.on("open",() => {

})
module.exports = {
    db,
    Schema
}