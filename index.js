const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, inlineCode } = require("discord.js");
const { loadEvents } = require("./Handlers/eventHandler");
const mongoose = require("mongoose");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
  partials: [Partials.User, Partials.Message, Partials.GuildMember, Partials.ThreadMember],
});

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

mongoose.set("strictQuery", false);
mongoose
  .connect(client.config.DatabaseURL, {})
  .then(() => console.log("The client is now connected to the database."))
  .catch((err) => {
    console.error(`Connect Database Failure!!!`, err);
    client.users.send(client.config.DeveloperID, {
      embeds: [
        new EmbedBuilder().setColor("Red").setDescription(`⛔ | Không thể kết nối database do lỗi : ${inlineCode(err.message.slice(0, 2000))}`),
      ],
    });
  });

loadEvents(client);

client.login(client.config.Token);
