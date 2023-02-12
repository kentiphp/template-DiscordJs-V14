const { ChatInputCommandInteraction, Client, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Will repond with pong."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const sent = await interaction.reply({
      content: `Pong!(${client.ws.ping}ms.)`,
      fetchReply: true,
      ephemeral: true,
    });

    const sentAgain = await interaction.editReply({
      content: `Pong again!!!(Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms)`,
      ephemeral: true,
      fetchReply: true,
    });

    return interaction.editReply({
      content: "",
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setTitle("❤ Current Ping")
          .setDescription(`Ping is : ${client.ws.ping}ms. \nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms.`),
      ],
    });
  },
};
