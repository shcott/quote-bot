"use strict"

var fs = require('fs')

var FILE_PATH = '../../data/quotes.json'

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
            "idCounter": 0,
            "quotesList": []
        }
    }
}

const readFromFile = () => {
    fs.readFile(FILE_PATH, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            quotesJson = JSON.parse(data)
            console.log('Data read from file')
        }
    })
}

const writeToFile = () => {
    initQuotesJsonIfNull()

    let data = JSON.stringify(quotesJson)
    fs.writeFile(FILE_PATH, data, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('Data written to file')
        }
    });
}

exports.addQuote = (quote) => {
    quotesJson.add(size, quotes)
    writeToFile()
}

exports.removeQuote = (quoteId) => {
    quotesJson.remove(quoteId)
    writeToFile()
}

exports.getQuote = (quoteId) => {
    return quotesJson
    // return quoteJson.quotesList[quoteId]
}