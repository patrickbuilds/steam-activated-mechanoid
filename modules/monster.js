let allowed = {
    channels: ["general"]
};

module.exports.run = async(bot, prefix, message, args, chanList) => {
    let allowedChannels = [];
    allowed.channels.forEach((name, id) => {
        allowedChannels.push(chanList[name]);
    });
    if(!allowedChannels.includes(message.channel.id)) return;

    if(!args[0]) return message.reply("I need to know which monster you're trying to kill.");
    let flag = args.slice(-1);
    let monster;
    let type;
    let playstyle;
    if(flag.toString().toLowerCase() === "p2p") {
        monster = args.slice(0, -1).join(' ').toLowerCase();
        type = 1;
        playstyle = "P2P";
    } else {
        monster = args.join(' ').toLowerCase();
        type = 0;
        playstyle = "F2P";
    }

    let demon = bot.emojis.find("name", "demon");
    let scarlet = bot.emojis.find("name", "scarlet");
    let trick = bot.emojis.find("name", "trickster");
    let tracker = bot.emojis.find("name", "tracker");
    let crow = bot.emojis.find("name", "crow");
    let femme = bot.emojis.find("name", "femme");
    let eguide = bot.emojis.find("name", "ethereal");
    let death = bot.emojis.find("name", "death_archer");
    let shade = bot.emojis.find("name", "shade");
    let goblin = bot.emojis.find("name", "goblin");
    let sage = bot.emojis.find("name", "sage");
    let ele = bot.emojis.find("name", "elemental");
    let incin = bot.emojis.find("name", "incinerate");
    let prima = bot.emojis.find("name", "prima");
    let petite = bot.emojis.find("name", "petite");
    let snow = bot.emojis.find("name", "tracker");
    let dream = bot.emojis.find("name", "dream_witch");
    let lore = bot.emojis.find("name", "lore");
    let song = bot.emojis.find("name", "songstress");
    let dark = bot.emojis.find("name", "dark_follow");

    let lineup = {
        "blackwing": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${femme} ${tracker} ${eguide} ${crow} ${death}`],
        "bon appeti": [`${demon} ${scarlet} ${tracker} ${trick}, ${shade}`, `${demon} ${femme} ${tracker} ${eguide} ${crow}`],
        "frostwing": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${demon} ${scarlet} ${trick} ${tracker} ${crow}`],
        "gargantua": [`${goblin} ${ele} ${incin} ${prima} ${snow}`, `${goblin} ${ele} ${incin} ${prima} ${snow}`],
        "grim reaper": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${femme} ${tracker} ${eguide} ${crow} ${death}`],
        "gryphon": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${demon} ${scarlet} ${trick} ${tracker} ${crow}`],
        "hell drider": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${femme} ${tracker} ${eguide} ${crow} ${death}`],
        "jade wyrm": [`${goblin} ${ele} ${incin} ${prima} ${snow}`, `${goblin} ${ele} ${incin} ${prima} ${snow}`],
        "mecha trojan": [`${incin} ${prima} ${goblin} ${ele} ${snow}`, `${petite} ${incin} ${snow} ${dream} ${dark}`],
        "mega maggot": [`${goblin} ${ele} ${incin} ${prima} ${snow}`, `${petite} ${song} ${incin} ${snow} ${dark}`],
        "noceros": [`${goblin} ${ele} ${incin} ${prima} ${snow}`, `${petite} ${ele} ${incin} ${dream}, ${lore}`],
        "queen bee": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${femme} ${tracker} ${eguide} ${crow} ${death}`],
        "saberfang": [`${goblin} ${ele} ${incin} ${prima} ${snow}`, `${petite} ${ele} ${incin} ${snow} ${dream}`],
        "snow beast": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${demon} ${scarlet} ${trick} ${tracker} ${crow}`],
        "terrorthorn": [`${demon} ${scarlet} ${trick} ${tracker} ${crow}`, `${demon} ${femme} ${tracker} ${eguide} ${crow}`],
        "tidal titan": [`${incin} ${ele} ${sage} ${prima} ${goblin}`, `${petite} ${ele} ${incin} ${snow} ${dream}`],
    }

    if(!lineup[monster]) return message.reply("I can't find that monster in my infinite tome of knowledge.");
    message.channel.send(`The following ${playstyle} heroes will be most effective: \n\n${lineup[monster][type]}`);
}

module.exports.help = {
    name: "monster",
    description: "display a list of F2P heroes that will do the most damage to a monster",
    usage: "monster <monster name> [p2p]",
    aliases: ['mob', 'tokill', 'lineup']
}