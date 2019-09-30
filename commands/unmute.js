const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mUser) return message.reply("Couldnt find the user specified..");
  let mReason = args.join(" ").slice(22);
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");

  mUser.removeRole(badChild.id);
  let unmuteEmbed = new Discord.RichEmbed()
  .setTitle("UNMUTE")
  .setColor("#42c2a2")
  .addField("Muted User", `${mUser} with ID: ${mUser.id}`)
  .addField("unMuted By", `${message.author} with ID: ${message.author.id}`);

  let punishChannel = message.guild.channels.find(`name`, "🛑punishments");
  if(!punishChannel) return message.channel.send("Couldn't find punishement log channel..");
  punishChannel.send(unmuteEmbed);
}

module.exports.help = {
  name: "unmute"
}
