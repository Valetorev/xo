const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.reply("Couldnt find the user specified..");
  let rReason = args.join(" ").slice(22);
  let reportEmbed = new Discord.RichEmbed()
  .setTitle("REPORTS")
  .setColor("#42c2a2")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", rReason);

  let reportsChannel = message.guild.channels.find(`name`, "📥reports");
  if(!reportsChannel) return message.reply("Couldn't find reports channel..")

  message.delete().catch(O_o=>{});
  reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
