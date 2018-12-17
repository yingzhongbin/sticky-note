const Sequelize = require('sequelize');
var path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',

  // 仅限 SQLite
  storage: path.join(__dirname, '../database/database.sqlite')
});

//建表

// sequelize
//     .authenticate()
//     .then(() => {
//       console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//       console.error('Unable to connect to the database:', err);
//     });

const Note = sequelize.define('note', {
  content: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  },
  stars:{
    type: Sequelize.INTEGER,
  },
  over: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
});


//创建时间createdAt
//force: true 如果表已经存在，将会丢弃表
// Note.sync({force: true}).then(() => {
//   // 表已创建
//   return Note.create({
//     content: 'fuck',
//     uid:'36562860',
//     stars:3,
//     over:true
//   });
// });

//添加
// Note.create({
//   content: 'fucking',
//   uid:'36562860'
// });
//
// //查询
// Note.findAll({raw:true}).then(data => {
//   console.log(data)
// })
//
// // 删除
//
// Note.destroy({
//   where: {
//     content: 'fucking'
//   },
// });
//
// //更新
//
// Note.update({
//   content: 'fucking you'
// }, {
//   where: {
//     content: 'fuck'
//   }
// });
module.exports.Note = Note

