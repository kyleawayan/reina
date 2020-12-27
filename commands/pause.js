module.exports = {
  name: "pause",
  description: "pause current song",
  execute(message, args, client) {
    client.player.pause(message);
  },
};
