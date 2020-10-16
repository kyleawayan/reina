module.exports = {
  name: "resume",
  description: "resume music",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return;
    }
    return message.channel.send("nothing is playing");
  },
};
