// ping.js
module.exports = {

  name: "ping",
  // the command, so to call this command it will be "reina ping"

  description: "say pong when someone says ping",
  // description to show in help command

  aliases: ["bruh"],
  // optional aliases

  usage: "", 
  // optional usage example to show in "reina help" command.
  // note that it shows "reina <the command>" and then whatever you put here
  // so for example for this ping command, if there was something in the usage string,
  // it would show "reina ping <whatever you put for the usage>"

  execute(message, args) {

    // "message" returns info about the user, etc.
    // "arg" returns the arguments of the command in an array.

    message.channel.send("pong");

  },
};