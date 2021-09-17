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
    
    try {
      command.run(client, message, args)
    } catch (e) {
      client.sendEmbed(message.channel, "I have a error while execute this command, try again.")
    }
  }
}