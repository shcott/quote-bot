"use strict"

var fs = require('fs')

var FILE_PATH = './data/quotes.json'

var LOGGER = null
var quotesJson = null;

exports.init = (_logger) => {
    LOGGER = _logger
    readFromFile()
    initQuotesJsonIfNull()
}

const initQuotesJsonIfNull = () => {
    if(!quotesJson) {
        quotesJson = {
            nextIdCounter: 0,
            quotesObject: {}
        }
    }
}

exports.getQuotesJsonAsString = () => {
    return JSON.stringify(quotesJson, null, 2)
}

const readFromFile = () => {
    fs.readFile(FILE_PATH, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            quotesJson = JSON.parse(data)
            LOGGER.info('Data read from file')
        }
    })
}

const writeToFile = (successCallback, errorCallback) => {
    initQuotesJsonIfNull()

    let data = JSON.stringify(quotesJson, null, 2)
    fs.writeFile(FILE_PATH, data, (err) => {
        if(err) {
            console.log(err)
            if(errorCallback) errorCallback(err)
        } else {
            LOGGER.info('Data written to file')
            if(successCallback) successCallback()
        }
    });
}

exports.addQuote = (quote, successCallback, errorCallback) => {
    quotesJson.quotesObject[quotesJson.nextIdCounter] = quote
    quotesJson.nextIdCounter += 1
    writeToFile(successCallback, errorCallback)
}

exports.editQuote = (quoteId, quote, successCallback, errorCallback) => {
    const before = quotesJson.quotesObject[quoteId]
    const after = quote
    quotesJson.quotesObject[quoteId] = quote
    writeToFile(() => successCallback(before, after), errorCallback)
}

exports.removeQuote = (quoteId, successCallback, errorCallback) => {
    delete quotesJson.quotesObject[quoteId]
    writeToFile(successCallback, errorCallback)
}

exports.getQuote = (quoteId) => {
    return quotesJson.quotesObject[quoteId]
}

exports.getQuotesObject = () => {
    return quotesJson.quotesObject
}