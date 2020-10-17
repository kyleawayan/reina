module.exports = {
  name: "shutdown",
  execute(message, args) {
    if (message.author.id == process.env.id) {
      message.client.destroy();
    }
  },
};
