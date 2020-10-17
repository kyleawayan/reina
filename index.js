#!/usr/bin/env node
process.chdir(__dirname);
require("dotenv").config();
if (process.env.id == "") {
  console.log("please set your user id environment variable!");
  process.exit();
}

if (process.env.discord == "") {
  console.log("please set your discord token environment variable!");
  process.exit();
}
const Discord = require("discord.js");
const i18n = require("i18n");
const locale = require(`./locales/en.json`);
const ora = require("ora");
const MusicClient = require("./struct/Client");
const client = new MusicClient();
var pjson = require("./package.json");
const fs = require("fs");
client.commands = new Discord.Collection();
const updateNotifier = require("update-notifier");
const pkg = require("./package.json");

updateNotifier({ pkg }).notify();


const spinner = ora({
  text: `loading commands`,
  color: "red",
}).start();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  spinner.text = `loaded ${command.name}`;
}

spinner.color = "yellow";
spinner.text = "connecting to discord";

i18n.configure({
  locales: ["en"],
  directory: `${__dirname}/locales`,
});
i18n.setLocale("./locales/en.json");

client.on("ready", () => {
  spinner.clear();
  // prettier-ignore
  console.log(`                                              
    __      ___     ( )   __      ___    
  //  ) ) //___) ) / / //   ) ) //   ) ) 
 //      //       / / //   / / //   / /  
//      ((____   / / //   / / ((___( (   

                v${pjson.version}
   `);
  spinner.succeed(`logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  // hey function used from https://github.com/ReFruity/EzBot/blob/master/util/stringUtil.js
  function hey(transcription, words) {
    return words.includes(transcription) > 0;
  }

  if (hey(msg.content, locale.hi)) {
    msg.channel.send("hey!");
  }
});

// right now i don't know how to implement i18n to prefixes, so right now i have three client listeners.
// may not be the best thing right now but it works

// reina prefix
client.on("message", (message) => {
  const prefix = "reina";

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const precommand = args.shift().toLowerCase();

  const command =
    client.commands.get(precommand) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(precommand)
    );
  if (!command) return;

  try {
    client.commands.get(command.name).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// rei prefix
client.on("message", (message) => {
  const prefix = "rei";

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const precommand = args.shift().toLowerCase();

  const command =
    client.commands.get(precommand) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(precommand)
    );
  if (!command) return;

  try {
    client.commands.get(command.name).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

// rey prefix
client.on("message", (message) => {
  const prefix = "rey";

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const precommand = args.shift().toLowerCase();

  const command =
    client.commands.get(precommand) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(precommand)
    );
  if (!command) return;

  try {
    client.commands.get(command.name).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(process.env.discord);
