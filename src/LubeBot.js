"use strict"

var Discord = require('discord.io')
var LOGGER = require('winston')
var AUTH = require('../auth/auth.json')
var CommandHandler = require('./handlers/CommandHandler.js')
var FileHelper = require('./helpers/FileHelper')

LOGGER.remove(LOGGER.transports.Console)
LOGGER.add(new LOGGER.transports.Console, {
    colorize: true
})
LOGGER.level = 'debug'

var bot = new Discord.Client({
    token: AUTH.token,
    autorun: true
})

bot.on('ready', function (evt) {
    LOGGER.info('Connected')
    LOGGER.info('Logged in as: ')
    LOGGER.info(bot.username + ' - (' + bot.id + ')')
    CommandHandler.register(bot, LOGGER)
    FileHelper.init(LOGGER)
})

bot.on('message', function (user, userId, channelId, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ')
        var cmd = args[0].toLowerCase()
        
        args = args.splice(1)
        CommandHandler.handleCommand(cmd, args, user, userId, channelId, message, evt)
     }
})