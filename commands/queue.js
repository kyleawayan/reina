module.exports = {
  name: "queue",
  description: "show the music queue",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("nothing is playing");
    return message.channel.send(`
song queue
—
${serverQueue.songs.map((song) => `• ${song.title}`).join("\n")}

		`);
  },
};
