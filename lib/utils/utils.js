const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const compile = (templatename, data) => {
  const templatePosition = `../template/${templatename}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

//判断文件夹是否存在
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

const writeFiles = (path, content) => {
  return fs.promises.writeFile(path, content);
};
module.exports = {
  compile,
  writeFiles,
  createDirSync,
};
