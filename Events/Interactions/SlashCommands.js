const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This command is outdate.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== client.config.DeveloperID)
      return interaction.reply({
        content: "This command is only available to the developer.",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};
