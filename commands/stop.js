module.exports = {
  name: "stop",
  description: "stop the music and clear the queue",
  execute(message) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "you need to be in a voice channel to use this"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("nothing is playing");
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  },
};
