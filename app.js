const koa = require("koa");
const koaBody = require('koa-body')
const router = require('./routes');

const app = new koa();

// 注册中间件
app.use(koaBody({
    multipart: true,
    strict:false,//设为false
    formidable: {
        maxFieldsSize: 2 * 1024 * 1024
    }
}))

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("app starting at port 3000");
});


