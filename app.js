// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //載入handlebars
const methodOverride = require('method-override')

const routes = require('./routes') // 引用路由器
require('./config/mongoose')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //指定副檔名
app.set('view engine', 'hbs')


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