#! /usr/bin/env node

const program = require("commander");

const helpOptions = require("./lib/core/htlp");
helpOptions();

const careateCommands = require("./lib/core/create");
careateCommands();

program.version(require("./package.json").version);
program.parse(process.argv);
