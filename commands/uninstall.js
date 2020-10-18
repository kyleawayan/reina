const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

module.exports = {
  name: "uninstall",
  description: "uninstall third-party commands",
  usage: "rei-hi",
  execute(message, args) {
    if (message.author.id == process.env.id) {
      if (args[0] !== undefined) {
        if (args[1] !== "--with-deps") {
          const init = require(`../custom/${args[0]}.json`);
          const commandspath = path.join(__dirname, "..", "custom");

          delete require.cache[require.resolve(`../custom/${init.name}.js`)]; // this doesn't work for some reason

          message.channel.send(
            "deleting " + init.name + " from custom commands directory"
          );
          fs.unlink(`${commandspath}/${init.name}.js`, (err) => {
            if (err) {
              message.channel.send(`error. please check logs for details`);
              console.log(err);
            } else {
              delete require.cache[
                require.resolve(`../custom/${args[0]}.json`)
              ];
              message.channel.send(
                `**uninstalled ${init.name}!** please restart reina now.`
              );
            }
          });

          fs.unlink(`${commandspath}/${init.name}.json`, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else {
          const init = require(`../custom/${args[0]}.json`);
          const commandspath = path.join(__dirname, "..", "custom");

          delete require.cache[require.resolve(`./${init.name}.js`)];

          message.channel.send(
            "deleting " + init.name + " from custom commands directory"
          );
          fs.unlink(`${commandspath}/${init.name}.js`, (err) => {
            if (err) {
              console.log(err);
            }
          });

          message.channel.send(
            "uninstalling " + init.dependencies.join(", ") + "..."
          );
          init.dependencies.unshift("uninstall");
          const deps = spawn("npm", init.dependencies);
          deps.stdout.on("data", function (data) {
            console.log(data.toString());
          });
          deps.stderr.on("data", function (data) {
            console.log(data.toString());
          });
          deps.on("exit", function () {
            delete require.cache[require.resolve(`../custom/${args[0]}.json`)];
            message.channel.send(
              `**uninstalled ${init.name}!** please restart reina now.`
            );
          });

          fs.unlink(`${commandspath}/${init.name}.json`, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      } else {
        message.channel.send("what do you want me to uninstall?");
      }
    }
  },
};
