// from https://github.com/eritislami/evobot/blob/master/commands/skip.js

module.exports = {
  name: "loop",
  description: "loop current song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("nothing is playing").catch(console.error);

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`loop is now ${queue.loop ? "**on**" : "**off**"}`)
      .catch(console.error);
  },
};
