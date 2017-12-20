let allowed = {
    channels: ["general", "family", "offtopic", "founders", "members", "test"],
    role: "everyone"
};

const jsonfile = require('jsonfile');

module.exports.run = async(bot, prefix, message, args, chanList) => {
    let allowedChannels = [];
    allowed.channels.forEach((name, id) => {
        allowedChannels.push(chanList[name]);
    });
    if(!allowedChannels.includes(message.channel.id)) return;

    if(!args[0]) return message.reply("I need to know which familiar you're trying to lookup.");

    let familiars = jsonfile.readFileSync('./familiars.json');
    let familiar = args.join(' ');

    for(var key in familiars) {
        if(key.toUpperCase() === familiar.toUpperCase()) {
            let pact = `*Pact ${familiars[key].pact}*\n\n`;
            let skill1 = (familiars[key].skill1 ? `Skill 1: ${familiars[key].skill1}\n` : "");
            let skill2 = (familiars[key].skill2 ? `Skill 2: ${familiars[key].skill2}\n` : "");
            let skill3 = (familiars[key].skill3 ? `Skill 3: ${familiars[key].skill3}\n` : "");
            message.channel.send(`**${key}** - ${pact}${skill1}${skill2}${skill3}`);
        }
    }
}

module.exports.help = {
    name: "familiar",
    description: "display a familiar's (max level) skills and pact",
    usage: "familiar <familiar name>",
    aliases: ["pokemon", "pet"]
}