module.exports = {
  name: "skip",
  description: "skip the currently playing song",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    serverQueue.connection.dispatcher.end();
  },
};
