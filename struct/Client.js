// from https://github.com/iCrawl/discord-music-bot/blob/master/src/struct/Client.js

const { Client, Collection } = require("discord.js");

module.exports = class extends Client {
  constructor(config) {
    super({
      disableMentions: "everyone",
    });

    this.commands = new Collection();

    this.cooldowns = new Collection();

    this.queue = new Map();

    this.config = config;
  }
};
