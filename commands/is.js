module.exports = {
  name: "is",
  description: "is this user this?",
  usage: "kyle stupid?",
  execute(message, args) {
    stupidOrNaw = Math.round(Math.random());
    if (stupidOrNaw < 0.5) {
      message.channel.send(
        `yes, ${args[0]} is ${args.slice(1, 999).join(" ")}`
      );
    } else {
      message.channel.send(
        `no, ${args[0]} is not ${args.slice(1, 999).join(" ")}`
      );
    }
  },
};
