// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars') //載入handlebars
const methodOverride = require('method-override')
const routes = require('./routes') // 引用路由器
const session = require('express-session')
const usePassport = require('./config/passport')// 載入設定檔，要寫在 express-session 以後
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //指定副檔名
app.set('view engine', 'hbs')

app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: true
}))

//使用body-parser
app.use(express.urlencoded({ extended: true }))
//使用method-override
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})