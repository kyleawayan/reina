require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const i18n = require("i18n");
const locale = require(`./locales/en.json`);
const StringUtil = require("./util/stringUtil");

i18n.configure({
  locales: ["en"],
  directory: `${__dirname}/locales`,
});
i18n.setLocale("./locales/en.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  function hey(transcription, words) {
    return words.includes(transcription) > 0;
  }

  if (hey(msg.content, locale.hi)) {
    msg.channel.send("hey!");
  }
});

client.on("message", (msg) => {
  // "reina" will be the "prexix"
  if (StringUtil.isTranscriptionContains(msg.content, locale.reina)) {
    // make a better way to handle commands: ex. if the message is "reina play", then take the second word (play)
    // and look for the existing js file in /things/
    // so since it's play, it would execute stuff in play.js
    var command = [];
    command = msg.content.split(" ")[1];
    console.log(command);

    msg.channel.send(command + "command");
  }
});

client.login(process.env.discord);
