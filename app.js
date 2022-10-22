// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //載入handlebars
const methodOverride = require('method-override')
const session = require('express-session')
const { proppatch } = require('./routes')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

const routes = require('./routes') // 引用路由器
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //指定副檔名
app.set('view engine', 'hbs')

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

//使用body-parser
app.use(express.urlencoded({ extended: true }))
//使用method-override
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})