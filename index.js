var IrcBot = require('./IrcBot');

let IRC_CONFIG = {
  server: 'irc.snoonet.org',
  nick: 'yoshibot-test',
  channels: ['#bots-testing'],
  admin: 'SILV3R'
};

var yoshi = new IrcBot(IRC_CONFIG);
yoshi.connect();
yoshi.addDefaultListeners();
