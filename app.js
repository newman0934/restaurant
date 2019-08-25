
//載入express
const express = require("express")
const app = express()
const port = 3000

//載入express-handlebars
const exphbs = require("express-handlebars")

//載入restaurant的json檔
const restaurantList = require("./restaurant.json")

//設定express-handlebars樣板引擎
app.engine("handlebars",exphbs({defaultLayout:"main"}))
app.set("view engine","handlebars")

//指向靜態檔案位置
app.use(express.static("public"))

//回傳index頁面
app.get("/",(req,res)=>{
    res.render("index",{restaurant:restaurantList.results})
})

//回傳show頁面
app.get("/restaurants/:id",(req,res)=>{
    //比對餐廳的id
    const restaurant = restaurantList.results.find( restaurant => {
        return restaurant.id.toString() === req.params.id
    })
    res.render("show",{restaurant:restaurant})
})

//回傳搜尋後的頁面
app.get("/search",(req,res)=>{
    //取search裡的值
    const keyword = req.query.keyword
    //比對json的name與search的值
    const restaurant = restaurantList.results.filter( restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render("index",{restaurant:restaurant})
})

//監聽並啟動伺服器
app.listen(port,()=>{
    console.log("express is listening")
})