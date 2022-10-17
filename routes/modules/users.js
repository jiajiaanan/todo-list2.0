const express = require('express')
const router = express.Router()
// 定義登入頁路由
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})
module.exports = router