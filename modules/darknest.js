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

    let allowedTimes = ['5', '10', '60'];
    if(args[0] === "cancel"){
        sql.get(`SELECT * FROM darknests WHERE captain ="${message.author.id}"`).then(row => {
            if(row) {
                sql.get(`DELETE FROM darknests WHERE captain ="${message.author.id}"`);
                message.reply("I've cancelled your darknest rally.");
            } else {
                message.reply("you don't have any darknest rallies to cancel..");
            }
        }).catch((e) => {
            console.log(e.stack);
            return;
        });
    } else if(args[0]) {
        if(allowedTimes.includes(args[0])) {
            let captain = message.author.id;
            let channelId = message.channel.id;
            let time = Date.now() + ((parseInt(args[0]) * 1000) * 60);
            let rallyTime = args[0];
            let halfTime = time - ((rallyTime / 2) * 60000);

            sql.get(`SELECT * FROM darknests WHERE captain ="${captain}"`).then(row => {
                if (!row) {
                    sql.run("INSERT INTO darknests (captain, channel_id, end_time, duration, half) VALUES (?, ?, ?, ?, ?)", [captain, channelId, time, rallyTime, halfTime]);
                } else {
                    sql.run(`UPDATE darknests SET end_time = ${time}, duration = ${rallyTime}, half = ${halfTime} WHERE captain ="${captain}"`);
                }
            }).catch((e) => {
                console.log(e.stack);
                return;
            });
            message.channel.send(`@everyone A darknest rally has been started. The march starts in ${args[0]} minutes! Jump in the game to join in!`);
        } else {
            message.reply(`that's not a valid rally time, maybe try again? Type \`${prefix}help darknest\` for more information!`);
        }
    } else {
        sql.all(`SELECT * FROM darknests WHERE channel_id ="${message.channel.id}"`).then((rows) => {

            if(rows.length > 0) {
                message.channel.send(`I found ${rows.length} active darknest rallies, here they are:`);

                rows.forEach((row) => {
                    let captain = bot.users.get(row.captain).username;
                    let endTime = Math.floor((row.end_time - Date.now()) / 60000);

                    message.channel.send(`${captain}'s darknest rally ends in about ${endTime} minutes.`);
                });
            } else {
                message.channel.send("No one is having a darknest rally without you, don't worry.");
            }
        });
    }
}

module.exports.help = {
    name: "darknest",
    description: "Notify people that you've started a darknest rally.",
    usage: "darknest <5, 10, 60>",
    aliases: ['dn', 'nest']
}