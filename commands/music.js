const yts = require("yt-search");
const youtubedl = require("youtube-dl");
const ytdl = require("ytdl-core"); // only for search since i couldn't get youtube-dl working
const fs = require("fs")
const ora = require("ora");
const { Util } = require("discord.js");

module.exports = {
  name: "play",
  description: "play music",
  execute(message, args) {
    const { channel } = message.member.voice;
    var connection;
    async function test() {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        music();
      } else {
        message.channel.send(`you need to join a voice channel`);
      }
    } test();

    async function music() {
      var videos;
      var song;
      const serverQueue = message.client.queue.get(message.guild.id);
      if (
        !args
          .slice(0, 999)
          .join(" ")
          .match(
            new RegExp(
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
            )
          )
      ) {
        const r = await yts(args.slice(0, 999).join(" "));
        videos = r.videos.slice(0, 3);
        song = {
          id: videos[0].videoId,
          title: videos[0].title,
          url: videos[0].url,
        };
        if (serverQueue) {
          serverQueue.songs.push(song);
          return message.channel.send(
            `**${videos[0].title}** has been added to the queue`
          );
        }
      } else {
        const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, "$1"));
        song = {
          id: songInfo.id,
          title: Util.escapeMarkdown(songInfo.videoDetails.title),
          url: songInfo.videoDetails.video_url,
        };
        if (serverQueue) {
          serverQueue.songs.push(song);
          return message.channel.send(
            `**${songInfo.videoDetails.title}** has been added to the queue`
          );
        }
      }



      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true
      };

      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);

      const play = async song => {

        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
          queue.voiceChannel.leave();
          message.client.queue.delete(message.guild.id);
          return;
        }
        
        let writeStream = await youtubedl(
          song.url,
          // Optional arguments passed to youtube-dl.
          ["--format=bestaudio"],
          // Additional options can be given for calling `child_process.execFile()`.
          { cwd: __dirname }
        ).pipe(fs.createWriteStream('file.webm', {flags: 'w'}));
  
        message.channel.startTyping();
        const spinner = ora({
          text: `downloading ${song.title}`,
          color: "red",
        }).start();

        await new Promise(done => setTimeout(done, 5000));

        let readStream = fs.createReadStream('file.webm');
  
          const dispatcher = connection.play(readStream)
          .on('start', () => {
            message.channel.stopTyping();
            spinner.stop();
          })
          .on('finish', () => {
            writeStream.end();
            queue.songs.shift();
            play(queue.songs[0])
          })
          .on('error', error => console.error(error));
          dispatcher.setVolumeLogarithmic(queue.volume / 5);
          message.client.user.setActivity(song.title, { type: "LISTENING" });

      }
      try {
        queueConstruct.connection = connection;
        play(queueConstruct.songs[0]);
      } catch (error) {
        console.error(`i could not join the voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send(
          `i could not join the voice channel: ${error}`
        );
      }

    }
  },
};
