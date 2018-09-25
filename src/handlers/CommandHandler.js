"use strict"

var FileHelper = require('../helpers/FileHelper')

var bot = null
var LOGGER = null

exports.register = (_bot, _logger) => {
    bot = _bot
    LOGGER = _logger
}

exports.handleCommand = (cmd, args, user, userId, channelId, message, evt) => {
    switch(cmd) {
        case 'ping':
            handlePing(channelId)
            break
        case 'add':
        case 'addquote':
            handleAddQuote(channelId, args)
            break
        case 'edit':
        case 'editquote':
            handleEditQuote(channelId, args)
            break
        case 'remove':
        case 'removequote':
            handleRemoveQuote(channelId, args)
            break
        case 'getfulljson':
            handleGetFullJson(channelId)
        case 'get':
        case 'getquote':
            handleGetQuote(channelId, args)
            break
        case 'random':
        case 'randomQuote':
            handleRandomQuote(channelId)
            break
        case 'list':
            handleList(channelId)
            break
    }
}

const sendMessage = (channelId, msg) => {
    bot.sendMessage({
        to: channelId,
        message: msg
    })
}

const handlePing = (channelId) => {
    LOGGER.info('Pong!')
    console.log('pong!')
    sendMessage(channelId, 'pong!')
}

const handleAddQuote = (channelId, args) => {
    let quote = args.join(' ')

    FileHelper.addQuote(quote, () => {
        sendMessage(channelId, 'Quote stored!')
    }, () => {
        sendMessage(channelId, 'Storing quote failed. What have you done?')
    })
}

const handleEditQuote = (channelId, args) => {
    let quoteId = args[0]
    let quote = args.splice(1).join(' ')

    FileHelper.editQuote(quoteId, quote, (beforeQuote, afterQuote) => {
        const text = 'Quote edited! Changed from:\n\t' + beforeQuote +
                     '\nTo:\n\t' + afterQuote
        sendMessage(channelId, text)
    }, () => {
        sendMessage(channelId, 'Editing quote failed. Why have you done?')
    })
}

const handleRemoveQuote = (channelId, args) => {
    FileHelper.removeQuote(args[0], () => {
        sendMessage(channelId, 'Quote removed!')
    }, () => {
        sendMessage(channelId, 'Removing quote failed. What done you have?')
    })
}

const handleGetFullJson = (channelId) => {
    sendMessage(channelId, FileHelper.getQuotesJsonAsString())
}

const handleGetQuote = (channelId, args) => {
    const quote = FileHelper.getQuote(args[0])
    sendMessage(channelId, quote ? quote : 'That quote doesn\'t exist dude.')
}

const handleRandomQuote = (channelId) => {
    const quotesObject = FileHelper.getQuotesObject()
    const quotesKeys = Object.keys(quotesObject)
    const randomIndex = Math.random() * quotesKeys.length
    const quoteId = quotesKeys[Math.floor(randomIndex)]
    sendMessage(channelId, quotesObject[quoteId])
}

const handleList = (channelId) => {
    const quotesObject = FileHelper.getQuotesObject()
    let listString = Object.keys(quotesObject).map((id) => {
        return id + ' - ' + quotesObject[id]
    }).join('\n')
    sendMessage(channelId, listString)
}