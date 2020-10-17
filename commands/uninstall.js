const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

module.exports = {
  name: "uninstall",
  description: "unisntall third-party commands",
  cooldown: 10,
  execute(message, args) {
      if (message.author.id == process.env.id) {
        if (args[0] !== undefined) {
            const init = require(`../commands/${args[0]}.json`);
            const commandspath = path.join(__dirname, "..", "commands");
      
            message.channel.send(
              "deleting " + init.name + " from commands directory"
            );
            fs.unlink(`${commandspath}/${init.name}.js`, (err) => {
              if (err) {
                console.log(err);
              }
            });
      
            message.channel.send(
              "uninstalling " + init.dependecies.join(", ") + "..."
            );
            init.dependecies.unshift("uninstall");
            const deps = spawn("npm", init.dependecies);
            deps.stdout.on("data", function (data) {
              console.log(data.toString());
            });
            deps.stderr.on("data", function (data) {
              console.log(data.toString());
            });
      
            fs.unlink(`${commandspath}/${init.name}.json`, (err) => {
              if (err) {
                console.log(err);
              }
            });
      
            setTimeout(() => {
              message.channel.send(`uninstalled ${init.name}! please restart reina.`);
            }, 1500);
          } else {
            message.channel.send("what do you want me to uninstall?");
          }
      }
  },
};
