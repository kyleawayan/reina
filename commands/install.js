var clone = require("git-clone");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const quiz = {
  question: `i am not responsible for any harm done by installing third-party commands! please check what you are installing first! type "agree" if you agree`,
  answers: ["agree"],
};

const filter = (response) => {
  return quiz.answers.some(
    (answer) => answer.toLowerCase() === response.content.toLowerCase()
  );
};

module.exports = {
  name: "install",
  description: "isntall third-party commands",
  cooldown: 10,
  execute(message, args) {
    message.channel.send(quiz.question).then(() => {
      message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
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
                "installing " + init.dependecies.join(", ") + "..."
              );
              init.dependecies.unshift("install");
              const deps = spawn("npm", init.dependecies);
              deps.stdout.on("data", function (data) {
                console.log(data.toString());
              });
              deps.stderr.on("data", function (data) {
                console.log(data.toString());
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

              message.channel.send(
                `installed ${init.name}! please restart reina.`
              );

              const tempdir = path.join(__dirname, "..", "temp");

              fs.rmdir(tempdir, { recursive: true }, (err) => {
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
  },
};
