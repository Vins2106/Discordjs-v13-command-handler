module.exports = {
  name: "ready",
  disable: false,
  run: async (client) => {
    client.user.setStatus("idle")
    client.user.setActivity("melody", {type: "LISTENING"})
    
    console.log(`[DISCORD] login as ${client.user.username}!`, `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
  }
}