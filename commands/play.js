const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");
const { Util } = require("discord.js");

module.exports = {
  name: "play",
  description: "play music from youtube",
  usage: "niki` or `reina play https://www.youtube.com/watch?v=P_FB84Acp60",
  execute(message, args) {
    const { channel } = message.member.voice;
    var connection;
    async function test() {
      if (message.member.voice.channel) {
        connection = await message.member.voice.channel.join();
        connection.voice.setSelfDeaf(true);
        music();
      } else {
        message.channel.send(`you need to join a voice channel`);
      }
    }
    test();

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
        loop: false,
        volume: 2,
        playing: true,
      };

      message.client.queue.set(message.guild.id, queueConstruct);
      queueConstruct.songs.push(song);

      const play = async (song) => {
        const queue = message.client.queue.get(message.guild.id);
        if (!song) {
          queue.voiceChannel.leave();
          message.client.queue.delete(message.guild.id);
          return;
        }

        let writeStream = await ytdl(song.url, {
          quality: "highestaudio",
        }).pipe(fs.createWriteStream("file.webm", { flags: "w" }));

        message.channel.startTyping();

        await new Promise((done) => setTimeout(done, 2000));

        let readStream = fs.createReadStream("file.webm");

        const dispatcher = connection
          .play(readStream, { highWaterMark: 50 })
          .on("finish", () => {
            // from https://github.com/eritislami/evobot/blob/2b037d5bd5e7cd51d371ebef0a52659aa3946baf/include/play.js#L55-L65
            if (queue.loop) {
              writeStream.end();
              let lastSong = queue.songs.shift();
              queue.songs.push(lastSong);
              play(queue.songs[0]);
            } else {
              writeStream.end();
              queue.songs.shift();
              play(queue.songs[0]);
              message.client.user.setActivity(null);
            }
          })
          .on("error", (error) => console.error(error));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        message.client.user.setActivity(song.title, { type: "LISTENING" });
        message.channel.stopTyping();
      };
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
