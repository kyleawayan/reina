module.exports = {
  name: "play",
  description: "play music from youtube",
  usage: "niki` or `reina play https://www.youtube.com/watch?v=P_FB84Acp60",
  execute(message, args, client) {
    (async () => {
      if (message.member.voice.channel) {
        if (
          !args[0].match(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
          )
        ) {
          client.player.play(message, args.slice(0, 999).join(" "), true);
          if (client.player.isPlaying(message)) {
            message.react("✅");
          }
        } else {
          client.player.play(message, args[0]);
          if (client.player.isPlaying(message)) {
            message.react("✅");
          }
        }
      } else {
        message.channel.send(`you need to join a voice channel`);
      }
    })();
  },
};
