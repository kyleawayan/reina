module.exports = {
  name: "queue",
  description: "show the music queue",
  execute(message, args, client) {
    const serverQueue = client.player.getQueue(message);
    return message.channel.send(`
song queue
—
${serverQueue.tracks.map((song) => `• ${song.title}`).join("\n")}

		`);
  },
};
