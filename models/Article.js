const mongoose = require("mongoose");

const schema = mongoose.Schema;
// Creat New Db
const article_schema = new schema({
    title:String,
    discription:String,
    likes:Number
})

// Creat Name DB & Push Db (article_schema)
const Article = mongoose.model("Article", article_schema);
// Export Because Import it in file index.js
module.exports = Article;