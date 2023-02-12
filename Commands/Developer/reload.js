const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Client, Routes } = require("discord.js");
const { restart } = require("nodemon");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload your Commands/Events")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName("events").setDescription("Reload your events."))
    .addSubcommand((options) => options.setName("commands").setDescription("Reload your commands.")),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        for (const [key, value] of client.events) client.removeAllListeners(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({ content: "Reloaded Events", ephemeral: true });
        break;

      case "commands":
        await client.application.commands.set([], interaction.guildId);
        loadCommands(client);
        interaction.reply({ content: "Reloaded Commands", ephemeral: true });
        break;
      default:
        break;
    }
  },
};
