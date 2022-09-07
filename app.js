// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()
const Todo = require('./models/todo') // 載入 Todo model
const routes = require('./routes') // 引用路由器

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//載入handlebars
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //指定副檔名
app.set('view engine', 'hbs')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})


//使用body-parser
app.use(express.urlencoded({ extended: true }))

//使用method-override
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)




// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})