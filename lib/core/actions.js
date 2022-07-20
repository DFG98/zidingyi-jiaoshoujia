const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const path = require("path");

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeFiles, createDirSync } = require("../utils/utils");

//项目模板
const createProjectAction = async (project) => {
  console.log(`wny helps create project: ${project} ~`);
  //clone the project 克隆项目
  await download(vueRepo, project, { clone: true });

  //执行 npm install
  //在windows下npm的执⾏命令不同
  const command = process.platform === "win32" ? "yarn.cmd" : "yarn";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  //执行 npm run serve
  await commandSpawn(command, ["serve"], { cwd: `./${project}` });
};

//组件模板
const apptcpnemplateAction = async (name, dest) => {
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  //有对应的路径之后再执行
  createDirSync(dest);
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeFiles(targetPath, result);
};

//页面模板
const appPageAndRouter = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() };
  const resultPage = await compile("vue-component.ejs", data);
  const resultRouter = await compile("vue-router.ejs", data);

  //有对应的路径之后再执行
  createDirSync(`${dest}/${name}`);
  const pagetPath = path.resolve(`${dest}/${name}`, `${name}.vue`);
  const routerPath = path.resolve(`${dest}/${name}`, `router.js`);
  writeFiles(pagetPath, resultPage);
  writeFiles(routerPath, resultRouter);
};

//仓库模板
const appStoreAction = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() };
  const resultStore = await compile("vue-store.ejs", data);
  const resultTypes = await compile("vue-types.ejs", data);

  //有对应的路径之后再执行
  createDirSync(`${dest}/${name}`);
  const storePath = path.resolve(`${dest}/${name}`, `index.js`);
  const typesPath = path.resolve(`${dest}/${name}`, `types.js`);
  writeFiles(storePath, resultStore);
  writeFiles(typesPath, resultTypes);
};

module.exports = {
  createProjectAction,
  apptcpnemplateAction,
  appPageAndRouter,
  appStoreAction,
};
