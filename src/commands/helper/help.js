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
    .setDescription(`My prefix is \`${process.env.PREFIX}\`
_ _
_ _`)
    .setTimestamp()
    
    let mods = client.modules;
    
    mods.map(mod => {
      embed.addField(`${mod.name} (${mod.cmds.length})`, `${mod.cmds.map(cmd => `> **${cmd.name}**\n${cmd.description}`)}`, true)
    });
    
    embed.video = "https://www.youtube.com/watch?v=5qap5aO4i9A"
    
    message.channel.send({embeds: [embed]})
    
  },
  slash: null
}