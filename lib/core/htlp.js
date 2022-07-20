const program = require("commander");
const helpOptions = () => {
  program.option("-w --dog", "hello dafeigou");
  program.option("-d --dest <dest>", "例如：why xx xx -d qq/ww/ee/ss");
  program.option("-f --farmework <farmework>", "farmework");

  program.on("--help", function () {
    console.log(program.opts());
  });
};
module.exports = helpOptions;
