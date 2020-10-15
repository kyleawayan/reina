module.exports = {
  // use https://github.com/przemyslawpluta/node-youtube-dl
  // pass url to music.js and make temporary audio file, (make some queue system too), and use discord.js to play it
  name: "play",
  description: "play music",
  execute(message, args) {
    async function music() {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        connection.play("./selene.mp3");
      }
    }
    music();
  },
};
