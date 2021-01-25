const express = require("express");
const app = express();
let mongoose = require("mongoose");
require("dotenv").config();
const color = "#05eeff"

let db = require("./database.js");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/:code", async (req, res) => {
  db.findOne({ code: req.params.code }, async (err, data) => {
    if (err) {
      return res.json({ error: "Unable to find this code on database."})
    }
    
    if (data) {
      
      data.used + 1;
      data.save()
      
      return res.redirect(data.guild.redirect)
      
    } else if (!data) {
      return res.json({error: "Unable to find this code on database."})
    }
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

let Discord = require("discord.js");
let client = new Discord.Client({
  disableMentions: "everyone"
});

client.on("ready", () => {
  console.log(`Ready to handle all url`);
});

// Bot

let config = process.env;

client.login(config.token);

client.on("guildRemove", async guild => {
  
  db.findOne({ guild: {id: guild.id } }, async (err, data) => {
    if (err) return;
    
    if (data) {
      data.remove()
    } else {
      return;
    }
  })
  
});

// connect to mongodb
mongoose.connect(config.mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  
  let prefix = "url"
  
  if (message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd === "help") {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Make your own invite url', client.user.displayAvatarURL())
    .setColor(color)
    .addField(`${prefix}help`, 'Show this command, and commands list')
    .addField(`${prefix}set`, 'Set this server invite url channel')
    .addField(`${prefix}edit`, 'Edit this server custom invite code')
    .addField(`${prefix}unsetup`, 'Unsetup this server custom invite url or delete')
    .addField(`${prefix}setup`, 'Setup the own invite url')
    .addField(`${prefix}link`, 'Get this server own invite link')
    .addField(`${prefix}tutorial`, 'Get the tutorial embed')
    .setFooter(`©️ URLCORD.CF - 2021`)
    
    message.channel.send(embed);
  };
  
  if (cmd === "set") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(perms("Administrator"))
    
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send(error(`Error: You must mentions channel first.`));
    
    if (!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(perms("Create Invite"));
    
    db.findOne({guild: {id: message.guild.id }}, async (err, data) => {
      
      if (data) {
        return message.channel.send(error(`Error: This server do not setup, use **${prefix}setup** first.`))
      } else {
    const link = await channel.createInvite({maxAge: 0, maxUses: 0});
    
    message.channel.send(succes(`Succes: This server invite url channel has been set to ${channel}`));
        data.guild.redirect = `https://discord.gg/${link.code}`
        data.save()
        
      }
      
    });
  
  };
  
  if (cmd === "edit") {
    
  }
  
  if (cmd === "setup") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(perms("ADMINISTRATOR"));
    
    const channel = message.mentions.channel.first() || message.channel;
    
    db.findOne({guild: {id: message.guild.id}}, async (err, data) => {
      
      if (data) {
        return message.channel.send(error(`Error: This server already setup.`))
      } else {
        
        let code = "server" + makeid(2);
        const link = await channel.createInvite({maxAge: 0, maxUses: 0});
        
        let newData = new db({
          code: code,
          used: 0,
          guild: {id: message.guild.id, code: code, redirect: `https://discord.gg/${link.code}`},
          user: {id: message.author.id, tag: message.author.tag, username: message.author.username}
        });
        
        newData.save();
        
        message.channel.send(succes(`Succes: Succesfully setup, the default url is https://urlcord.cf/${code} you can edit with **${prefix}edit <new_code>**`));
        
      }
      
    });
    
    
  };
  
  if (cmd === "unsetup") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channnel.send(perms("Administrator"));
    
    db.findOne({guild: {id: message.guild.id}}, async (err, data) => {
      
      if (data) {
        
        
        data.remove();
        
        return message.channel.send(succes(`Succes: Succesfully unsetup`))
        
      } else {
        
        return message.channel.send(error(`Error: This server do not setup`));
        
      }
      
    });
  }
  
  if (cmd === "link") {
    
    db.findOne({guild: {id: message.guild.id}}, async (err, data) => {
      
      if (data) {
        return message.channel.send(`here: ${data.guild.redirect}`)
      } else {
        return message.channel.send(error(`Error: This server do not setup`))
      }
      
    })
    
  }
  
  if (cmd === "tutorial") {
    
  }
});

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

async function error(message) {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(message)
  
  return embed;
}

async function succes(message) {
  const embed = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(message)
  
  return embed;
}

async function perms(permission) {
  return error(`Error: Im need **${permission}** permission`)
}