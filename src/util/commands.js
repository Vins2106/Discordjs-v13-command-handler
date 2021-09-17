const fs = require("fs");

module.exports = (client) => {
  
  fs.readdir("src/commands", async (err, mods) => {
    
    mods.forEach(mod => {
      
      fs.readdir(`src/commands/${mod}`, async (err, cmds) => {
        
        let modConfig = require(`../commands/${mod}/module.js`);
        if (!modConfig) return;
        
        cmds.forEach(cmd => {
          if (!cmd.endsWith('.js')) return;
          if (cmd == "module.js") return;
          
          let cmdConfig = require(`../commands/${mod}/${cmd}`);
          if (!cmdConfig) return;
          
          if (cmdConfig.disable) return;
          
          cmdConfig.aliases.map(a => {
            client.aliases.set(a, cmdConfig.name)
          });
          
          modConfig.cmds.push(cmdConfig)
          
          client.commands.set(cmdConfig.name, cmdConfig);
        });
        
        console.log(`[HANDLER] load ${modConfig.name} modules :: (${cmds.length - 1})`);
        client.modules.set(modConfig.name, modConfig);
        
      });
       
    })
    
  });
  
}