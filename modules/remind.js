const sql = require("sqlite");

let allowed = {
    channels: ["general"]
};

module.exports.run = async(bot, prefix, message, args, chanList) => {
    let allowedChannels = [];
    allowed.channels.forEach((name, id) => {
        allowedChannels.push(chanList[name]);
    });
    if(!allowedChannels.includes(message.channel.id)) return;

    if(args[0]) {
        let time = args[0].slice(0, -1);
        let unit = args[0].slice(-1);
        let reminder = args.slice(1).join(' ');
        let remindTime;
        let remindDate = new Date();

        if(unit === "h") {
            remindTime = Date.now() + (parseInt(time) * 3600000);
        } else if(unit === "m") {
            remindTime = Date.now() + (parseInt(time) * 60000);
        } else if(unit === "s") {
            remindTime = Date.now() + (parseInt(time) * 1000);
        }

        remindDate.setTime(remindTime);

        if(reminder != "" && remindTime) {
            await sql.run("INSERT INTO reminders (userId, time, reminder) VALUES (?, ?, ?)", [message.author.id, remindTime, reminder]).catch(() => {
                console.error;
            });

            message.reply(`sure thing, buddy!`);

        } else {
            message.reply("I can't remind you if you don't tell me when and what to remind you about!");
        }
    }
}

module.exports.help = {
    name: "remind",
    description: "remind you of something in a defined amount of time",
    usage: "remind <#h OR #m OR #s> <message>",
    aliases: []
}