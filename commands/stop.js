module.exports = {
  name: "stop",
  description: "stop the music and clear the queue",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    serverQueue.songs = [];
  },
};
