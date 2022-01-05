const fs = require("fs");
const path = require("path");
const router = require("koa-router")();
const { checkDirExist, dirExist } = require("../utils/index");

const ROOT = path.resolve(path.join(__dirname, "../"));
const UPLOAD_HOME = path.resolve(ROOT, "public/uploads");

router.post("/upload", async (ctx, next) => {
  const { version } = ctx.request.body;
  const { name: fileName, path } = ctx.request.files.file;
  const fileDir = `${UPLOAD_HOME}/${version}`;

  checkDirExist(fileDir)
  // 创建文件输入流
  const fileReader = fs.createReadStream(path);
  const filePath = `${fileDir}/${fileName}`;
  const fileWriter = fs.createWriteStream(filePath);
  fileReader.pipe(fileWriter);
  // 向客户端返回的内容
  ctx.response.body = {
    code: 200,
    fileName,
  };
});

router.get("/download", async (ctx, next) => {
  const { version } = ctx.query;
  const filePath = `${UPLOAD_HOME}/${version}/@ionic-native.zip`;
  if (dirExist(filePath)) {
    const fileSize = fs.statSync(filePath).size;
    try {
      const createReadStream = await fs.createReadStream(filePath);
      ctx.set("Content-type", "application/force-download");
      ctx.set("Content-Length", fileSize);
      ctx.body = createReadStream;
    } catch (error) {
      console.log(error);
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "文件内容不存在",
    }
  }
});

module.exports = router;
