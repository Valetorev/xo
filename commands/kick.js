const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.reply("Couldnt find the user specified..");
  let kReason = args.join(" ").slice(22);
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");
  if(kUser.roles.find(r => r.name === "Staff")) return message.reply("You cannot kick a staff member!")

  let kickEmbed = new Discord.RichEmbed()
  .setTitle("KICK")
  .setColor("#42c2a2")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let punishChannel = message.guild.channels.find(`name`, "🛑punishments");
  if(!punishChannel) return message.reply("Couldn't find punishement log channel..")

  message.guild.member(kUser).kick(kReason);
  message.delete().catch(O_o=>{});
  punishChannel.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
