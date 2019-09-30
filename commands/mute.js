const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mUser) return message.reply("Couldnt find the user specified..");
  let mReason = args.join(" ").slice(22);
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");
  if(mUser.roles.find(r => r.name === "Staff")) return message.reply("You cannot mute a staff member!");

  let badChild = message.guild.roles.find(`name`, "Bad Child");

  let muteEmbed = new Discord.RichEmbed()
  .setTitle("MUTE")
  .setColor("#42c2a2")
  .addField("Muted User", `${mUser} with ID: ${mUser.id}`)
  .addField("Muted By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Time", message.createdAt)
  .addField("Duration", "Permenant")
  .addField("Reason", mReason);

  let punishChannel = message.guild.channels.find(`name`, "🛑punishments");
  if(!punishChannel) return message.channel.send("Couldn't find punishement log channel..");

  await(mUser.addRole(badChild.id));
  message.delete().catch(O_o=>{});
  punishChannel.send(muteEmbed);
}

module.exports.help = {
  name: "mute"
}
