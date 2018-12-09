npm init 初始化package.json（需要填写）
npm init -y 直接初始化package.json

2.安装express
npm install express --save

3.安装nrm 可以切换npm源
npm i nrm -g
nrm use cnpm

4.安装express脚手架
npm install express-generator --save-dev

5.启动express
npx express  

6.安装express项目
express -f --view=ejs

7.安装依赖
npm i

8.运行项目
npm start

9.打开网站
http://localhost:3000/

10.更换端口

11.静态资源
http://localhost:3000/stylesheets/style.css

12.一级路由
app.use('/fuck', function(req, res, next) {
    res.send('fuck');  // success
});

13.二级路由，拿到数据
router.use('/:id', function(req, res, next) {
    //   http://localhost:3000/xxx/111asddasdasda success
    res.send(req.params.id);
});
14.__dirname代表当前路径
app.set('views', path.join(__dirname, 'views'));


npm install webpack --save-dev 

npm install --save-dev webpack-cli
 
 
安装onchange
npm install onchange --save-dev

全局安装jquery
```angularjs
resolve: {
    alias: {
      jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
      mod: path.join(__dirname, "js/mod"),
      less: path.join(__dirname, "less")
    }
  },
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery"
  }),
]
```

对require里的东西进行检测解析
```angularjs
module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "less-loader", "postcss-loader"]
      }) //把 css 抽离出来生成一个文件
    }]
  },
```

npm install --save sequelize

npm install --save sqlite3

需要建database文件夹


//解决拖动note的bug，使用$('body').on('mousemove')
$('body').on('mousemove',(e)=>{
  if(this.$note.hasClass('draggable')){
    console.log(e.pageX, e.pageY);
    this.$note.offset({
      left:e.pageX - this.$note.data('relativePosition').x,
      top:e.pageY - this.$note.data('relativePosition').y
    })
  }
})

安装passport
npm install passport

npm install passport-github

npm install passport-jirengu


```angularjs
.note{
  position: absolute;
  color: #333;
  width: 160px;
  margin: 20px 10px;
  transition: all 0.5s;
  box-shadow: 4px 8px 30px 2px rgba(0,0,0,0.66);
  .note-head{
    height: 20px;
    background-color: #ea9b35;
    cursor: move;
    font-size: 12px;
    line-height: 20px;
    padding-left: 10px;
    color: #666;
    &:hover .delete{
      opacity: 1;
    }

    &:before{
      position: absolute;
      left: 50%;
      top: -11px;
      margin-left: -32px;
      content: ' ';
      display: block;
      width: 64px;
      height: 18px;
      background: #35bba3;
    }

    &:after {
      position: absolute;
      left: 50%;
      margin-left: 32px;
      top: -11px;
      z-index: -1;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: 5px solid #299683;
      border-top: 18px solid transparent;
    }
  }

  .note-content{
    padding: 10px;
    background-color: #efb04e;
    outline: none;
  }

  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    opacity: 0;
    transition: opacity .3s;
  }

}
.note.new-note{
  left: 50%;
  top:30%;
  //transform:translate(-50%,-50%);
  margin-left: -80px;
}
```