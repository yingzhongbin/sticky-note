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