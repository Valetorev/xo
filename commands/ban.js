const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.reply("Couldnt find the user specified..");
  let bReason = args.join(" ").slice(22);
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");
  if(bUser.roles.find(r => r.name === "Staff")) return message.reply("You cannot ban a staff member!")

  let banEmbed = new Discord.RichEmbed()
  .setTitle("BAN")
  .setColor("#42c2a2")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason);

  let punishChannel = message.guild.channels.find(`name`, "🛑punishments");
  if(!punishChannel) return message.reply("Couldn't find punishement log channel..")

  message.guild.member(bUser).ban(bReason);
  message.delete().catch(O_o=>{});
  punishChannel.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
