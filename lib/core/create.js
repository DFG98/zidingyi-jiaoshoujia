const { program } = require("commander");

const {
  createProjectAction,
  apptcpnemplateAction,
  appPageAndRouter,
  appStoreAction,
} = require("./actions.js");

const careateCommands = () => {
  //创建项目模板
  program
    .command("create <project> [others...]")
    .description("create a new project")
    .action(createProjectAction);

  //创建组件模板
  program
    .command("addcpn <name>")
    .description("add vue components")
    .action((name) => {
      apptcpnemplateAction(name, program.opts().dest || "src/components");
    });

  //创建页面模板
  program
    .command("addpage <name>")
    .description("add vue page and routes")
    .action((name) => {
      appPageAndRouter(name, program.opts().dest || "src/pages");
    });

  //创建仓库模板
  program
    .command("addstore <store>")
    .description("add vue store")
    .action((store) => {
      appStoreAction(store, program.opts().dest || "src/store/modules");
    });
};

module.exports = careateCommands;
