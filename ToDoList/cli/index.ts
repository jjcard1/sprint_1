#!/usr/bin/env node
const commands = require("./commands");
const connectDB = require("./db");

const main = async () => {
   await connectDB.connect();
};

commands.executeProgram();
main();
