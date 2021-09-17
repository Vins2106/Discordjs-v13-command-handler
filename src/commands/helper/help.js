const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Show you all commands",
  disable: false,
  owner: false,
  aliases: ["h"],
  run: async (client, message, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png"}))
    .setColor(client.color)
    .setDescription(`> prefix :: \`${process.env.PREFIX}\``)
    .setTimestamp()
    
    let mods = client.modules;
    
    mods.map(mod => {
      embed.addField(`${mod.name} (${mod.cmds.length})`, `${mod.cmds.map(cmd => `> **${cmd.name}**\n${cmd.description}`)}`, true)
    });
    
    message.channel.send(embed)
    
  },
  slash: null
}