module.exports = {
  name: "skip",
  description: "skip the currently playing song",
  execute(message) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "you need to be in a voice channel to use this"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("nothing to skip");
    serverQueue.connection.dispatcher.end();
  },
};
