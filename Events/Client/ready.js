const { Client } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
module.exports = {
  name: "ready",
  once: true,

  /**
   *
   * @param {Client} client
   */
  execute(client) {
    console.log(`Client logged is as ${client.user.username}`);
    client.user.setActivity(`with ${client.guilds.cache.size} guild(s)`);

    loadCommands(client);
  },
};
