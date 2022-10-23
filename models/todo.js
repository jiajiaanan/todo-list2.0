const mongoose = require('mongoose')
const Schema = mongoose.Schema //模組
const todoSchema = new Schema({ //新建schema
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  isDone: {
    type: Boolean,
    default: false  // 預設完成狀態為 false
  },
  userId: {  // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema) //輸出