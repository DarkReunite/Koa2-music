import mongoose from 'mongoose';
let mongo = require('./setting');

mongoose.connect(mongo.url, {useNewUrlParser: true});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'conection error:'));

db.once('open', function () {
  console.log('数据库连接成功...');
})