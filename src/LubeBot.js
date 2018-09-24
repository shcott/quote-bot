var Discord = require('discord.io');
var LOGGER = require('winston');
var AUTH = require('../auth/auth.json');
var CommandHandler = require('./CommandHandler.js');

// Configure LOGGER settings
LOGGER.remove(LOGGER.transports.Console);
LOGGER.add(new LOGGER.transports.Console, {
    colorize: true
});
LOGGER.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: AUTH.token,
    autorun: true
});

bot.on('ready', function (evt) {
    LOGGER.info('Connected');
    LOGGER.info('Logged in as: ');
    LOGGER.info(bot.username + ' - (' + bot.id + ')');
    CommandHandler.registerBot(bot);
});

bot.on('message', function (user, userId, channelId, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        CommandHandler.handleCommand(cmd, args, user, userId, channelId, message, evt);
     }
});