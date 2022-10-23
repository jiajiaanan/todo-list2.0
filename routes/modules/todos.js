const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

//new頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//detail頁面路由
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id //動態路由
  return Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//edit頁面路由
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .lean() //把資料變成單純陣列
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

//Create功能
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name, userId })     // 整份資料存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Update功能
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})

//Delete功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Todo.findOne({ _id, userId })
    .then(todo => todo.remove()) //刪除該筆資料
    .then(() => res.redirect('/')) //導向根目錄頁
    .catch(error => console.log(error))
})

module.exports = router