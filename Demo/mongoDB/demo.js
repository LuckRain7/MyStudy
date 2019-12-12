/*
 * 构建模型
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // 生成时间
  date: { type: Date, default: Date.now },
  // 使用分类表信息 { type: mongoose.SchemaTypes.ObjectId, ref: "表名" }
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  name: { type: String },
  type: { type: String },
  grade: { type: String },
  phone: { type: Number },
  qq: { type: Number },
  professional: { type: String },
  state: { type: String }
});

module.exports = mongoose.model("People", schema, "People");
