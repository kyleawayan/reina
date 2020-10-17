const path = require("path");

module.exports = {
  name: "whereis",
  description: "find reina's root directory (admin only)",
  execute(message, args) {
    if (message.author.id == process.env.id) {
      message.channel.send(path.join(__dirname, ".."));
    }
  },
};
