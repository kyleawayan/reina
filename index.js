require("dotenv").config();
if (process.env.id == "" || process.env.id == undefined) {
  console.log("please set your user id environment variable!");
  process.exit();
}

if (process.env.discord == "" || process.env.discord == undefined) {
  console.log("please set your discord token environment variable!");
  process.exit();
}
const Discord = require("discord.js");
const { Player } = require("discord-player");
const i18n = require("i18n");
const locale = require(`./locales/en.json`);
const ora = require("ora");
const client = new Discord.Client();
const player = new Player(client);
client.player = player;
var pjson = require("./package.json");
const fs = require("fs");
client.commands = new Discord.Collection();

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

fs.access("./custom", (err) => {
  if (err) {
    return;
  } else {
    const customCommandFiles = fs
      .readdirSync("./custom")
      .filter((file) => file.endsWith(".js"));
    for (const file of customCommandFiles) {
      const command = require(`./custom/${file}`);
      client.commands.set(command.name, command);
      // for some reason, if discord.js takes some time connecting to discord,
      // the ora loading spinner never reaches lines 55 and 56.
      // so i just placed the "connecting to discord" stuff here
      //
      // spinner.text = `loaded ${command.name}`;
      spinner.color = "yellow";
      spinner.text = "connecting to discord";
    }
  }
});

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
    client.commands.get(command.name).execute(message, args, client);
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
    client.commands.get(command.name).execute(message, args, client);
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
    client.commands.get(command.name).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.player.on("trackStart", (message, track) =>
  message.client.user.setActivity(track.title, { type: "LISTENING" })
);

client.player.on("queueEnd", (message, track) =>
  message.client.user.setActivity(null)
);

client.player.on("botDisconnect", (message, track) =>
  message.client.user.setActivity(null)
);

client.player.on(
  "searchInvalidResponse",
  (message, query, tracks, content, collector) =>
    message.channel.send(
      `you must send a valid number between 1 and ${tracks.length}!`
    )
);

client.player.on("searchCancel", (message, query, tracks) =>
  message.channel.send(
    "you did not provide a valid response... please send the command again!"
  )
);

client.player.on("noResults", (message, query) =>
  message.channel.send(`no results found on youtube for ${query}!`)
);

client.player.on("error", (error, message) => {
  switch (error) {
    case "NotPlaying":
      message.channel.send("there is no music being played on this server!");
      break;
    case "NotConnected":
      message.channel.send("you are not connected in any voice channel!");
      break;
    case "UnableToJoin":
      message.channel.send(
        "i am not able to join your voice channel, please check my permissions!"
      );
      break;
    default:
      message.channel.send(`something went wrong... ${error}`);
  }
});

client.login(process.env.discord);
