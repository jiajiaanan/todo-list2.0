const express = require('express')
const router = express.Router()
// 定義登入頁路由
router.get('/login', (req, res) => {
  res.render('login')
})
module.exports = router