let allowed = {
    channels: ["general"]
};
const jimp = require("jimp");

module.exports.run = async(bot, prefix, message, args, chanList) => {
    let allowedChannels = [];
    allowed.channels.forEach((name, id) => {
        allowedChannels.push(chanList[name]);
    });
    if(!allowedChannels.includes(message.channel.id)) return;

    if(!args[0]) return message.reply("I need to know which monster you're trying to kill.");
    let monster = args.join(' ').toLowerCase();

    // TODO: only pull in images needed for the requested monster, this will also make editing the lineup array (below) easier
    let images = [
        './img/blank_template.png', './img/crow.png', './img/dark_follow.png', './img/death_archer.png', './img/demon.png',
        './img/dream_witch.png', './img/elemental.png', './img/ethereal.png', './img/femme.png', './img/goblin.png',
        './img/incinerate.png', './img/lore.png', './img/petite.png', './img/prima.png', './img/sage.png',
        './img/scarlet.png', './img/shade.png', './img/snow.png', './img/songstress.png', './img/tracker.png',
        './img/trickster.png'
    ];

    let lineup = {
        "blackwing": `4 15 20 19 1 8 19 7 1 3`,
        "voodoo shaman": `4 15 20 19 1 8 19 7 1 3`,
        "bon appeti": `4 15 19 20 16 4 8 19 7 1`,
        "frostwing": `4 15 20 19 1 4 15 20 19 1`,
        "gargantua": `9 6 10 13 17 9 6 10 13 17`,
        "grim reaper": `4 15 20 19 1 8 19 7 1 3`,
        "gryphon": `4 15 20 19 1 4 15 20 19 1`,
        "hell drider": `4 15 20 19 1 8 19 7 1 3`,
        "jade wyrm": `9 6 10 13 17 9 6 10 13 17`,
        "mecha trojan": `10 13 9 6 17 13 10 17 5 2`,
        "mega maggot": `9 6 10 13 17 13 18 10 17 2`,
        "noceros": `9 6 10 13 17 13 6 10 5, 11`,
        "queen bee": `4 15 20 19 1 8 19 7 1 3`,
        "saberfang": `9 6 10 13 17 13 6 10 17 5`,
        "snow beast": `4 15 20 19 1 4 15 20 19 1`,
        "terrorthorn": `4 15 20 19 1 4 8 19 7 1`,
        "tidal titan": `10 6 14 13 9 13 6 10 17 5`,
    }

    if(!lineup[monster]) return message.reply("I can't find that monster in my infinite tome of knowledge.");

    let jimps = [];

    for(var i = 0; i < images.length; i++) {
        jimps.push(jimp.read(images[i]));
    }

    let heroes = lineup[monster].split(" ");
    let randstring = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    await Promise.all(jimps).then(function(data) {
        return Promise.all(jimps);
    }).then(function(data) {
        data[0].composite(data[heroes[0]],0,30);
        data[0].composite(data[heroes[1]],100,30);
        data[0].composite(data[heroes[2]],200,30);
        data[0].composite(data[heroes[3]],300,30);
        data[0].composite(data[heroes[4]],400,30);
        data[0].composite(data[heroes[5]],0,154);
        data[0].composite(data[heroes[6]],100,154);
        data[0].composite(data[heroes[7]],200,154);
        data[0].composite(data[heroes[8]],300,154);
        data[0].composite(data[heroes[9]],400,154);
        data[0].write(`img/lineups/${randstring}.png`, function() {
            message.channel.send("",{files:[`./img/lineups/${randstring}.png`]});
        });
    });

    // TODO: remove the contents of ./img/lineups/
}

module.exports.help = {
    name: "monster",
    description: "display a list of heroes that will do the most damage to a monster",
    usage: "monster <monster name>",
    aliases: ['mob', 'tokill', 'lineup']
}