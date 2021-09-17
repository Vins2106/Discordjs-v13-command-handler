const fs = require("fs");

module.exports = (client) => {
  
  fs.readdir("src/commands", async (err, mods) => {
    
    mods.forEach(mod => {
      
      fs.readdir(`src/commands/${mods}`, async (err, cmds) => {
        
        let modConfig = require(`../commands/${mods}/module.js`);
        if (!modConfig) return;
        
        cmds.forEach(cmd => {
          if (!cmd.endsWith('.js')) return;
          if (cmd == "module.js") return;
          
          let cmdConfig = require(`../commands/${mods}/${cmd}`);
          if (!cmdConfig) return;
          
          if (cmdConfig.disable) return;
          
          cmdConfig.aliases
        });
        
        console.log(`[HANDLER] load ${modConfig.name} modules :: (${cmds.length - 1})`);
        client.modules.set(modConfig.name, modConfig);
        
      });
      
    })
    
  });
  
}