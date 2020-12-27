module.exports = {
  name: "stop",
  description: "stop the music and clear the queue",
  execute(message, args, client) {
    client.player.stop(message);
  },
};
