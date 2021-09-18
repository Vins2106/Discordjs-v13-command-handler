module.exports = {
  name: "messageCreate",
  disable: false,
  run: async (client, message) => {
    
    let prefix = process.env.PREFIX;
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    
    // disable
    if (command.disable) {
      return client.sendEmbed(message.channel, "This command has been disabled by owner.")
    }
    // no dm
    if (command.nodm) {
      if (message.channel.type === "dm") return client.sendEmbed(message.channel, "You cannot use this command on dm channel.")
    }
    // owner only
    if (command.owner) {
      if (message.author.id !== client.config.owner) return client.sendEmbed(message.channel, "This command only for owner.")
    }
    
    // cooldown
    let now = Date.now();
    let uCd = client.cooldown.get(`${}`)
    
    
    try {
      command.run(client, message, args)
    } catch (e) {
      client.sendEmbed(message.channel, "I have a error while execute this command, try again.")
    }
  }
}