// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Todo = require('./models/todo') // 載入 Todo model

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//使用body-parser
app.use(express.urlencoded({ extended: true }))

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


// 設定首頁路由
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

//new頁面路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

//detail頁面路由
app.get('/todos/:id', (req, res) => {
  const id = req.params.id //動態路由
  return Todo.findById(id) //從資料庫查出資料
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//edit頁面路由
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean() //把資料變成單純陣列
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//Create功能
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 整份資料存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Update功能
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id) //查詢單筆資料
    .then(todo => {
      todo.name = name //更新資料
      return todo.save() //重新儲存單筆資料
    })
    .then(() => res.redirect(`/todos/${id}`)) //導向detail頁
    .catch(error => console.log(error))
})


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})