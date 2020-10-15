const yts = require("yt-search");
const fs = require("fs");
const youtubedl = require("youtube-dl");
const ora = require("ora");

module.exports = {
  // use https://github.com/przemyslawpluta/node-youtube-dl
  // pass url to music.js and make temporary audio file, (make some queue system too), and use discord.js to play it
  name: "play",
  description: "play music",
  execute(message, args) {
  async function music() {
    message.channel.startTyping();
    const r = await yts(args.slice(0, 999).join(" "));
    const videos = r.videos.slice(0, 3);
    const url = await videos[0].url; // [0] is result number, prolly add somewhere to select this later. this console log returns url

    const video = youtubedl(
      url,
      // Optional arguments passed to youtube-dl.
      ["--format=bestaudio"],
      // Additional options can be given for calling `child_process.execFile()`.
      { cwd: __dirname }
    );

    const spinner = ora({
      text: `downloading ${videos[0].title}`,
      color: "red",
    }).start();

    // Will be called when the download starts.
    video.on("info", function (info) {
      spinner.stop();
      play();
    });

    video.pipe(fs.createWriteStream(`commands/${videos[0].videoId}.webm`));

    async function play() {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        message.channel.stopTyping();
        message.channel.send(`playing ${videos[0].title} \n${videos[0].url}`);
        connection.play(`commands/${videos[0].videoId}.webm`);
      }
    }
  }
    music();
  },
};
