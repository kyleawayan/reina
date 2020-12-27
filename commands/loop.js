// from https://github.com/eritislami/evobot/blob/master/commands/skip.js

module.exports = {
  name: "loop",
  description: "loop current song",
  execute(message, args, client) {
    const repeatModeStatus = client.player.getQueue(message).repeatMode;
    if (repeatModeStatus == false) {
      client.player.setRepeatMode(message, true);
      message.channel.send("loop is now on");
    } else {
      client.player.setRepeatMode(message, false);
      message.channel.send("loop is now off");
    }
  },
};
