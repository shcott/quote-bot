var bot = null;

exports.registerBot = function(_bot) {
    bot = _bot;
}

var handlePing = function(channelId) {
    bot.sendMessage({
        to: channelId,
        message: 'pong!'
    });
}

exports.handleCommand = function(cmd, args, user, userId, channelId, message, evt) {
    switch(cmd) {
        case 'ping':
            handlePing(channelId);
        break;
    }
}