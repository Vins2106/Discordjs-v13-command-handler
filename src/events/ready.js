module.exports = {
  name: "ready",
  disable: false,
  run: async (client) => {
    console.log(`[DISCORD] login as ${client.user.username}!`)
  }
}