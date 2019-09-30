const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.find(r => r.name === "Staff")) return message.reply("Insufficient permissions!");
  if(!args[0]) return message.reply("You did not specify a number of lines to delete.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
