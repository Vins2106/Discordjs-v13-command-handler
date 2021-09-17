const fs = require("fs");

module.exports = (client) => {
  
  fs.readdir("src/events", async (err, events) => {
    
    events.forEach(e => {
      if (!e.endsWith(".js")) return;
      
      let eConfig = require(`../events/${e}`);
      if (!eConfig) return;
      
      if (eConfig.disable) return;
      
      client.on(eConfig.name, eConfig.run(client))
    })
    
  });
  
};