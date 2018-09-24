"use strict"

var FileHelper = require('../helpers/FileHelper')

var bot = null
var LOGGER = null

exports.register = (_bot, _logger) => {
    bot = _bot
    LOGGER = _logger
}

const handlePing = (channelId) => {
    bot.sendMessage({
        to: channelId,
        message: 'pong!'
    })
}

const handleAddQuote = (channelId) => {
    const json = FileHelper.getQuote("") // TODO: replace with real code
    bot.sendMessage({
        to: channelId,
        message: JSON.stringify(json)
    })
}

const handleQotd = (channelId) => {
    bot.sendMessage({
        to: channelId,
        message: 'qotd!'
    })
}

const handleList = (channelId) => {
    bot.sendMessage({
        to: channelId,
        message: 'list!'
    })
}

exports.handleCommand = (cmd, args, user, userId, channelId, message, evt) => {
    switch(cmd) {
        case 'ping':
            handlePing(channelId)
            break
        case 'add':
            handleAddQuote(channelId)
            break
        case 'qotd':
            handleQotd(channelId)
            break
        case 'list':
            handleList(channelId)
            break
    }
}