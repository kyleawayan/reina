// ping.js
module.exports = {
  name: "ping", // the command, so to call this command it will be "reina ping"
  description: "say pong when someone says ping",
  aliases: ["bruh"], // optional aliases
  usage: "", // optional usage example to show in "reina help" command
  execute(message, args) {
    // "message" returns info about the user, etc.
    // "arg" returns the arguments of the command in an array.
    message.channel.send("pong");
  },
};
