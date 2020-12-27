module.exports = {
  name: "skip",
  description: "skip the currently playing song",
  execute(message, args, client) {
    client.player.skip(message);
  },
};
