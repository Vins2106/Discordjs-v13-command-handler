module.exports = {
  name: "help",
  description: "Show you all commands",
  disable: false,
  owner: false,
  aliases: ["h"],
  run: async (client, message, args) => {
    message.channel.send("Fooo!")
  },
  slash: null
}