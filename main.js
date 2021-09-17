// load env
require("dotenv").config()

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"]
});

client.login(process.env.TOKEN)

// utility
client.modules = new Discord.Collection();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collecion()

// commands
require(".src/util/commands.js")(client)

// events
require("./src/util/events.js")(client);