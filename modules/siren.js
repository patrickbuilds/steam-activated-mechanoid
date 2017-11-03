let allowed = {
    channels: ["general"]
};

module.exports.run = async(bot, prefix, message, args, chanList) => {
    let allowedChannels = [];
    allowed.channels.forEach((name, id) => {
        allowedChannels.push(chanList[name]);
    });
    if(!allowedChannels.includes(message.channel.id)) return;

    let attacker = (args[0] ? args.join(' ') : "Someone");
    message.channel.send(`:crossed_swords: @everyone ${attacker} is attacking the hive! :crossed_swords:`);
}

module.exports.help = {
    name: "siren",
    description: "Let everyone know the hive is under attack!",
    usage: "siren [attacker]",
    aliases: []
}