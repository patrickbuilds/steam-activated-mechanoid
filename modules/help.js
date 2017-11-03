const Discord = require("discord.js");

module.exports.run = async(bot, prefix, message, args) => {
    if(bot.commands.has(args[0])) {
        command = bot.commands.get(args[0]);
        message.channel.send(`\`\`\`'${command.help.name}':\n${command.help.description}\n\nusage:\n${prefix}${command.help.usage}\n\naliases: ${command.help.aliases.join(', ')}\`\`\``)
    } else {
        let noRelay = ['shield'];
        let helpBlurb = "A list of all useable modules:\n```";
        bot.commands.forEach(function(command){
            if(!noRelay.includes(command.help.name)) helpBlurb += `\n\n${prefix}${command.help.usage} - ${command.help.description}`;
        });
        helpBlurb += "```";

        message.author.send(helpBlurb);
        message.reply("I've sent you a list of commands, check your DMs!");
    }
}

module.exports.help = {
    name: "help",
    description: "displays help for a specified module, or sends a command list to your DMs",
    usage: "help [command]",
    aliases: []
}