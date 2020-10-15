const yts = require("yt-search");
const youtubedl = require("youtube-dl");
const ora = require("ora");

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
      const serverQueue = message.client.queue.get(message.guild.id);
      const r = await yts(args.slice(0, 999).join(" "));
      const videos = r.videos.slice(0, 3);

      const song = {
        id: videos[0].videoId,
        title: videos[0].title,
        url: videos[0].url
      };

      if (serverQueue) {
        serverQueue.songs.push(song);
        return message.channel.send(`✅ **${videos[0].title}** has been added to the queue!`);
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
        
        const video = youtubedl(
          song.url,
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
          playaudio()
        });
  
        async function playaudio() {
          const dispatcher = connection.play(video).on('finish', () => {
            queue.songs.shift();
            play(queue.songs[0])
          })
          .on('error', error => console.error(error));
          dispatcher.setVolumeLogarithmic(queue.volume / 5);
        }

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
