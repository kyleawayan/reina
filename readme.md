# reina

![banner](https://kylan.s3-us-west-1.amazonaws.com/projects/reinabanner.png)
<p align="center">
    a minimal <a href="https://www.npmjs.com/package/discord.js">discord.js</a> bot ✨
</p>

## disclaimer
this bot has no complicated permissions and stuff like that. reina is more for chill servers with some of your friends, not big servers.

## installation
set the environment variable `discord` to your bot token. after that, set another environment variable, `id`, to your discord user id (or whoever is going to have admin permissions to your bot). you can also make a `.env` file in the root directory to use [dotenv](https://www.npmjs.com/package/dotenv).
once your environment variable is set, you can start reina with `npm start`.

if you would like to run reina without having to keep anything open, i would recommend following this guide on how to setup reina with pm2: https://discordjs.guide/improving-dev-environment/pm2.html#installation. or use the `ecosystem.config.js` template (refer to https://pm2.keymetrics.io/docs/usage/deployment/) for deployment on a server.

if you are having issues, please refer to the—*work-in-progress*—[debugging page](https://github.com/kyleawayan/reina/wiki/debugging). please submit an issue if you need help, or even want to describe your own fixes to add to the wiki.

## usage
right now there are not many commands, but her "prefix" is `reina`. you could also use `rey` or `rei`. it's like speaking naturally to someone, so for example, a command can be `reina play niki` or `rei play niki`.

please refer to the [wiki page](https://github.com/kyleawayan/reina/wiki/Commands) for a list of available commands. you can also list all the commands in discord by using `reina help`.

## make your own commands
you can find out more on [this wiki page](https://github.com/kyleawayan/reina/wiki/developing-third-party-commands), but here's a quick summary:

reina uses [a dynamic command handler](https://discordjs.guide/command-handling/#individual-command-files), so it's very easy to make your own commands. you can do so by creating a module in the `commands` folder, say for example, `ping.js`. here's an example ping module:
```
// ping.js
module.exports = {

  name: "ping",
  // the command, so to call this command it will be "reina ping"

  description: "say pong when someone says ping",
  // description to show in help command

  aliases: ["bruh"],
  // optional aliases

  usage: "", 
  // optional usage example to show in "reina help" command.
  // note that it shows "reina <the command>" and then whatever you put here
  // so for example for this ping command, if there was something in the usage string,
  // it would show "reina ping <whatever you put for the usage>"

  execute(message, args) {

    // "message" returns info about the user, etc.
    // "arg" returns the arguments of the command in an array.

    message.channel.send("pong");

  },
};
```

lastly, you can run reina in debug mode by using `npm run dev`. this will restart reina whenever a file is changed using [nodemon](https://www.npmjs.com/package/nodemon).

## credits
- [iCrawl's example](https://github.com/iCrawl/discord-music-bot) and [EvoBot](https://github.com/eritislami/evobot/) for a music queuing system
- the art background is from niki's album, [*Zephyr*](https://open.spotify.com/album/4E3FHEEdQkcuEd0D2GKRrX).
