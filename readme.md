# reina

![banner](https://kylan.s3-us-west-1.amazonaws.com/projects/reinabanner.png)
<p align="center">
    a minimal <a href="https://www.npmjs.com/package/discord.js">discord.js</a> bot ✨
</p>

## installation
set the environment variable `discord` to your bot token. you can also make a `.env` file to use [dotenv](https://www.npmjs.com/package/dotenv).
once your environment variable is set, you can start reina with `npm start`.

## usage
right now there are not many commands, but her "prefix" is `reina`. you could also use `rey` or `rei`. it's like speaking naturally to someone, so for example, a command can be `reina play niki` or `rei play niki` *(no music command yet)*.

you can list all the commands available by using `reina help`.

## make your own commands
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

## art background
the art background is from niki's album, [*Zephyr*](https://open.spotify.com/album/4E3FHEEdQkcuEd0D2GKRrX).
