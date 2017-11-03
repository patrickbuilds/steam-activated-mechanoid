# steam-activated-mechanoid
A discord.js bot for Lords Mobile. Notable features include:

* Darknest Rally Tracker - tracks Darknest rallies within the channel.
* Reminder - remind yourself when your shield drops, or when a construction is finished.
* Siren - alert the channel someone is attacking your guild's hive.
* Monster Information - lists the best heroes to take down monsters.
   * Currently requires special emotes, will supply more info later.

 ## config.json
 You will need to setup a `config.json` file and fill in the following information:

 ```
 {
     "token": "",
     "prefix": "?",
     "chanList": {
         "general" : ""
     },
     "owner": ""
 }
 ```

 `token` and `prefix` are pretty obvious. `owner` is your user ID. `chanList` expects the following information:

 `"channel_nickname" : "channel ID"`

 The information in `"channel_nickname"` is up to you, just remember what it is because it is needed for limiting commands to certain channels.