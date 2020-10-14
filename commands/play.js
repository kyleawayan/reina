const yts = require("yt-search");

module.exports = {
  // use https://github.com/przemyslawpluta/node-youtube-dl
  // pass url to music.js and make temporary audio file, (make some queue system too), and use discord.js to play it
  name: "play",
  description: "play!",
  execute(message, args) {
    console.log(args);
    message.channel.send("Pong.");
  },
};
