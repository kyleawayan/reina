module.exports = {
  // use https://github.com/przemyslawpluta/node-youtube-dl
  // pass url to music.js and make temporary audio file, (make some queue system too), and use discord.js to play it
  name: "is",
  description: "is this user this?",
  execute(message, args) {
    stupidOrNaw = Math.round(Math.random());
    if (stupidOrNaw < 0.5) {
      message.channel.send(
        `yes, ${args[0]} is ${args.slice(1, 999).join(" ")}`
      );
    } else {
      message.channel.send(
        `no, ${args[0]} is not ${args.slice(1, 999).join(" ")}`
      );
    }
  },
};
