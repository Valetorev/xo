const Discord = require("discord.js");
let xp = require("../xp.json")

module.exports.run = async (bot, message, args) => {
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtlvlXP = curlvl * 500;
  let difference = nxtlvlXP - curxp;

  let levelEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#42c2a2")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til next level up`, message.author.displayAvatarURL);

  message.delete().catch(O_o=>{});
  message.channel.send(levelEmbed).then(msg => msg.delete(10000));
}

module.exports.help = {
  name: "level"
}
