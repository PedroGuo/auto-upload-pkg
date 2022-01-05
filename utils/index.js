const path = require('path');
const fs = require('fs');

function getUploadDirName(){
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    const dir = `${date.getFullYear()}${month}${date.getDate()}`;
    return dir;
  }
  

/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */

function dirExist(p) {
  return fs.existsSync(p)
}

 function checkDirExist(p) {
   if (dirExist(p)) return false
     return fs.mkdirSync(p);
 }
 

 function getUploadFileExt(name) {
    let ext = name.split('.');
    return ext[ext.length - 1];
  }


  module.exports = {
    dirExist,
    getUploadDirName,
    checkDirExist,
    getUploadFileExt
  };