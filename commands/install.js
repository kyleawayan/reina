var clone = require("git-clone");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const quiz = {
  question: `i am not responsible for any harm done by installing third-party commands! please check what you are installing first! type "agree" if you agree. installation will cancel if there is no response in the next ten seconds.`,
  answers: ["agree"],
};

const filter = (response) => {
  return quiz.answers.some(
    (answer) => answer.toLowerCase() === response.content.toLowerCase()
  );
};

module.exports = {
  name: "install",
  description: "install third-party commands",
  usage: "<github link>",
  cooldown: 10,
  execute(message, args) {
    if (message.author.id == process.env.id) {
      message.channel.send(quiz.question).then(() => {
        message.channel
          .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
          .then((collected) => {
            // agreed
            message.channel.send(`cloning repo...`);

            clone(args[0], "temp", { shallow: true }, (e) => {
              if (e !== undefined) {
                console.log(e);
                message.channel.send("error. please check log for details.");
                return;
              } else {
                message.channel.send(`done cloning repo!`);

                const init = require("../temp/init.json");

                message.channel.send(
                  "installing " + init.dependencies.join(", ") + "..."
                );
                init.dependencies.unshift("install");
                const deps = spawn("npm", init.dependencies);
                deps.stdout.on("data", function (data) {
                  console.log(data.toString());
                });
                deps.stderr.on("data", function (data) {
                  console.log(data.toString());
                });
                deps.on("exit", function () {
                  delete require.cache[require.resolve(`./${init.name}.js`)];
                  try {
                    const newCommand = require(`./${init.name}.js`);
                    message.client.commands.set(newCommand.name, newCommand);
                  } catch (error) {
                    console.error(error);
                    message.channel.send(
                      `there was an error while reloading the command ${init.name}:\n\`${error.message}\``
                    );
                  }
                  message.channel.send(`**installed ${init.name}!**`);

                  const tempdir = path.join(__dirname, "..", "temp");

                  fs.rmdir(tempdir, { recursive: true }, (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                });

                message.channel.send(
                  `moving ${init.name} to commands directory...`
                );
                const temp = path.join(__dirname, "..", "temp", init.filename);
                const dest = path.join(
                  __dirname,
                  "..",
                  "commands",
                  `${init.name}.js`
                );

                fs.rename(temp, dest, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });

                const tempjson = path.join(
                  __dirname,
                  "..",
                  "temp",
                  "init.json"
                );
                const destjson = path.join(
                  __dirname,
                  "..",
                  "commands",
                  `${init.name}.json`
                );

                fs.rename(tempjson, destjson, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
            });
          })
          .catch((collected) => {
            message.channel.send("cancelled installation");
          });
      });
    }
  },
};
