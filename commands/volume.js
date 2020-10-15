module.exports = {
  name: "volume",
  description: "change the volume",
  cooldown: 5,
  execute(message, args) {
    const { channel } = message.member.voice;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!args[0])
      return message.channel.send(`volume: **${serverQueue.volume}**`);
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`volume is now **${args[0]}**`);
  },
};
