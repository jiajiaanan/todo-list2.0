const mongoose = require('mongoose')
const Schema = mongoose.Schema //模組
const todoSchema = new Schema({ //新建schema
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  done: {
    type: Boolean
  }
})
module.exports = mongoose.model('Todo', todoSchema) //輸出