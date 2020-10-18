// from https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command

module.exports = {
  name: "help",
  description: "list all of my commands or info about a specific command.",
  aliases: ["commands"],
  usage: "[command name]",
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("here's a list of all my commands:");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\nyou can send \`reina help [command name]\` to get info on a specific command!`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("i've sent you a dm with all my commands!");
        })
        .catch((error) => {
          console.error(
            `could not send help dm to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like i can't dm you! do you have dms disabled?"
          );
        });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`\`reina ${command.name}\``);

    if (command.aliases) data.push(`or \`reina ${command.aliases}\``);
    if (command.description) data.push(`${command.description}`);
    if (command.usage) {
      data.push("—");
      data.push(`\`reina ${command.name} ${command.usage}\``);
    }

    message.channel.send(data, { split: true });
  },
};
