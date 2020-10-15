module.exports = {
  name: "pause",
  description: "pause music",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
    }
  },
};
