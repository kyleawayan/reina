module.exports = {
  name: "say",
  description: "say something through reina",
  usage: "kyle is stupid",
  execute(message, args) {
    message.channel.send(args.slice(0, 999).join(" "));
    message.delete();
  },
};
