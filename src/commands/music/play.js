const Discord = require("discord.js");

module.exports = {
  name: "play",
  description: "Start or add music on voice channel",
  disable: false,
  owner: false,
  cd: 5,
  aliases: ["p"],
  run: async (client, message, args) => {
    
    client.sendEmbed(message.channel, "Coming soon!")
    
  },
  slash: null
}