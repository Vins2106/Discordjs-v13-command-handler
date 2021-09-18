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
client.aliases = new Discord.Collection()
client.color = "#00F4FF"
client.MessageEmbed = Discord.MessageEmbed;
client.config = {
  owner: "727110220400033865"
}
client.cooldown = new Discord.Collection()

client.sendEmbed = (channel, content) => {
  const embed = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png"}))
  .setColor(client.color)
  .setDescription(content)
  .setTimestamp()
  
  channel.send({embeds: [embed]})
}

// commands
require("./src/util/commands.js")(client)

// events
require("./src/util/events.js")(client);

// website
require("./src/website/app.js")(client);