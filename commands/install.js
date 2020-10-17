var clone = require("git-clone");
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

          clone(args[0], "temp", null, (e) => {
            if (e !== undefined) {
              console.log(e);
              message.channel.send("error. please check log for details.");
              return;
            } else {
              message.channel.send(`done cloning repo!`);
            }
          });
        })
        .catch((collected) => {
          message.channel.send("cancelled installation");
        });
    });
  },
};
