const { v4: uuidv4 } = require("uuid");
var randomWords = require("random-words");

module.exports = {
  name: "hi",
  description: "hi",

  execute(message, args) {
    message.channel.send(uuidv4() + randomWords());
  },
};
