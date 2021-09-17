module.exports = {
  name: "messageCreate",
  disable: false,
  run: async (client, message) => {
    
    let prefix = process.env.PREFIX;
    
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
  }
}