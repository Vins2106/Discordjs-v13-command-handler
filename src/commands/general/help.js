const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "Show you all commands",
  disable: false,
  owner: false,
  cd: 10,
  nodm: false,
  aliases: ["h"],
  run: async (client, message, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({format: "png"}))
    .setColor(client.color)
    .setDescription(`My prefix is \`${process.env.PREFIX}\`
_ _`)
    .setTimestamp()
    
    let mods = client.modules;
    
    mods.map(mod => {
      embed.addField(`${mod.name} (${mod.cmds.length})`, `${mod.cmds.map(cmd => `> **${cmd.name}**\n${cmd.description}`)}`, true)
    });
    
    message.channel.send({embeds: [embed]})
    
  },
  slash: null
}