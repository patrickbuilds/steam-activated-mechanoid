try {
    require('./config.json')
} catch (e) {
    console.log('Config file not found.')
    process.exit()
}

const config = require("./config.json");
const Discord = require("discord.js");
const glob = require("glob");
const sql = require("sqlite");

const bot = new Discord.Client();
const prefix = config.prefix;
let chanList = config.chanList;

sql.open("./database.sqlite");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

glob('./modules/*.js', function(err, files) {
    if(err) console.error(err);
    console.log(`Loading a total of ${files.length} modules:`);
    files.forEach((f, i) => {
        let props = require(f);
        console.log(`loading module: ${props.help.name} ✓`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

bot.on("ready", async() => {
    await sql.run("CREATE TABLE IF NOT EXISTS reminders (userId TEXT, time INTEGER, reminder TEXT)");
    await sql.run("CREATE TABLE IF NOT EXISTS darknests (captain TEXT, channel_id TEXT, end_time INTEGER, duration INTEGER, half INTEGER)");

    console.log(`Ready and serving ${bot.users.size} users, in ${bot.channels.size} channels across ${bot.guilds.size} servers.`);

    bot.setInterval(() => {
        sql.get(`SELECT * FROM darknests`).then(row => {
            if(row) {
                let half = row.half;
                let end = row.end_time;
                let halfWay = row.duration / 2;
                let channel = bot.channels.get(row.channel_id);
                let timeLeft = (halfWay === 2.5 ? `2 minutes and 30 seconds` : `${halfWay} minutes`);

                if(half <= Date.now() && half >= Date.now() - 2000) {
                    channel.send(`@everyone <@${row.captain}>'s darknest rally is half way over! There's only ${timeLeft} left!`);
                } else if(end <= Date.now() && end >= Date.now() - 2000) {
                    channel.send(`@everyone <@${row.captain}>'s darknest rally is now marching and you can no longer join.`);
                    sql.get(`DELETE FROM darknests WHERE captain ="${row.captain}"`);
                }
            }
        }).catch((e) => {
            console.log(e.stack);
            return;
        });

        sql.get(`SELECT * FROM reminders WHERE time <="${Date.now()}"`).then(row => {
            if(row) {
                bot.users.get(row.userId).send(row.reminder);
                sql.get(`DELETE FROM reminders WHERE time ="${row.time}" AND reminder ="${row.reminder}"`);
            }
        }).catch((e) => {
            console.log(e.stack);
            return;
        });
    }, 2000);
});

const talkedRecently = new Set();

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(talkedRecently.has(message.author.id)) return;

    if(message.content.startsWith(prefix)) talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 1000);

    let messageArray =  message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd;
    if (bot.commands.has(command.slice(prefix.length))) {
        cmd = bot.commands.get(command.slice(prefix.length));
    } else if (bot.aliases.has(command.slice(prefix.length))) {
        cmd = bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    }

    if(cmd) cmd.run(bot, prefix, message, args, chanList);
});

bot.login(config.token);
bot.on('error', console.error)
bot.on('warn', console.warn)