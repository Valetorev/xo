const botconfig = require("./botconfig.json");
const xp = require("./xp.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, file) =>{
  if(err) console.log(err);

  let jsFile = file.filter(f => f.split(".").pop() === "js")
  if(jsFile.length <= 0){
    console.log("Couldn't find commands..");
    return;
  }

  jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("commands with '!'", {type: "LISTENING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtlvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp = curxp + xpAdd;
  if(nxtlvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    if(xp[message.author.id].level === 5) message.author.addRole(message.guild.roles.find(`name`, "Rookie [Tier I]"));
    if(xp[message.author.id].level === 7) message.author.addRole(message.guild.roles.find(`name`, "Amature [Tier II]"));
    if(xp[message.author.id].level === 10) message.author.addRole(message.guild.roles.find(`name`, "Experienced [Tier III]"));
    if(xp[message.author.id].level === 15) message.author.addRole(message.guild.roles.find(`name`, "Master [Tier IV]"));
    if(xp[message.author.id].level === 20) message.author.addRole(message.guild.roles.find(`name`, "God [Tier V]"));

    let levelupEmbed = new Discord.RichEmbed()
    .setTitle("LEVEL UP")
    .setColor("#42c2a2")
    .addField("User", `<@${message.author.id}>`)
    .addField("New Level", curlvl + 1);
    let levelChannel = message.guild.channels.find(`name`, "🥇level-ups");
    levelChannel.send(levelupEmbed);
  }

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err);
  });

  let prefix = botconfig.prefix;

  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You must wait 5 seconds between commands!").then(msg => msg.delete(2000));
  }
  if(!message.member.roles.find(r => r.name === "Staff")){
    cooldown.add(message.author.id);
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() =>{
    cooldown.delete(message.author.id);
  }, cdseconds * 1000);

});

bot.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Member"));
   let welcomeChat = guildMember.guild.channels.find(`name`, "👋join-leave-stream");
   welcomeChat.send(`👋Welcome, ${guildMember.username}, to 🔰 хσ™! Enjoy your stay and be sure to read #rules :P`);
});

bot.login(process.env.TOKEN);
