const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let helpEmbed = new Discord.RichEmbed()
  .setTitle("HELP")
  .setColor("#42c2a2")
  .addField("!ban <user> <reason>", "Will ban the mentioned user.")
  .addField("!unban <user ID>", "Will unban the specified user ID.")
  .addField("!kick <user> <reason>", "Will kick the mentioned user.")
  .addField("!tempmute <user> <time> <reason>", "Will mute the user for the specified amount of time.")
  .addField("!mute <user> <reason>", "Will mute the user.")
  .addField("!unmute <user>", "Will unmute the user.")
  .addField("!clear <number>", "Will delete the specified number of lines in chat.")
  .addField("!report <user> <reason>", "Will send a message to staff reporting a user.")
  .addField("!help", "Will show this message.")
  .addField("!level", "Will display your leveling info.");

  message.delete().catch(O_o=>{});
  message.reply(helpEmbed);
}

module.exports.help = {
  name: "help"
}
