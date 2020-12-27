module.exports = {
  name: "resume",
  description: "resume paused song",
  execute(message, args, client) {
    client.player.resume(message);
  },
};
