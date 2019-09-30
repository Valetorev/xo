const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = await bot.fetchUser(args[0]);
  if(!bUser) return message.reply("Couldnt find the user ID specified..");
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");

  let unbanEmbed = new Discord.RichEmbed()
  .setTitle("UNBAN")
  .setColor("#42c2a2")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("unBanned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Time", message.createdAt);

  let punishChannel = message.guild.channels.find(`name`, "🛑punishments");
  if(!punishChannel) return message.reply("Couldn't find punishement log channel..")

  message.guild.unban(bUser);
  message.delete().catch(O_o=>{});
  punishChannel.send(unbanEmbed);
}

module.exports.help = {
  name: "unban"
}
