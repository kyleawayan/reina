require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const i18n = require("i18n");
const locale = require(`./locales/en.json`);
const ora = require("ora");

const fs = require("fs");
client.commands = new Discord.Collection();
const spinner = ora("loading commands").start();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
  spinner.color = "red";
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
  console.log(`                                              
    __      ___     ( )   __      ___    
  //  ) ) //___) ) / / //   ) ) //   ) ) 
 //      //       / / //   / / //   / /  
//      ((____   / / //   / / ((___( (   
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

client.on("message", (message) => {
  const prefix = "reina";
  // "reina" will be the "prexix"
  // make a better way to handle commands: ex. if the message is "reina play", then take the second word (play)
  // and look for the existing js file in /things/
  // so since it's play, it would execute stuff in play.js

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("message", (message) => {
  const prefix = "rei";
  // "reina" will be the "prexix"
  // make a better way to handle commands: ex. if the message is "reina play", then take the second word (play)
  // and look for the existing js file in /things/
  // so since it's play, it would execute stuff in play.js

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("message", (message) => {
  const prefix = "rey";
  // "reina" will be the "prexix"
  // make a better way to handle commands: ex. if the message is "reina play", then take the second word (play)
  // and look for the existing js file in /things/
  // so since it's play, it would execute stuff in play.js

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(process.env.discord);
