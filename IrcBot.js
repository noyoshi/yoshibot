var irc = require('irc');
var utils = require('./utils/utils');

class IrcBot {
  constructor (config) {
    this.channels = config.channels;
    this.server = config.server;
    this.nick = config.nick;
    this.admin = config.admin;
    this.defaultChannel = this.channels[0];

    this.client = new irc.Client(this.server, this.nick , {
      channels: this.channels,
      autoConnect: false,
    });
  };

  connect () {
    // Need to add error listener else program will die if connected fails
    // and cannot handle error message
    this.client.addListener('error', (msg) => {
      console.log('ERROR => ', msg);
    });

    this.client.connect(10, (resp) => {
      let pass = process.env.BOT_PASS;

      console.log('using password => ', pass);
      console.log('server response => ', resp);
      // TODO refactor how this joins channels?
      this.client.join(this.defaultChannel, (input) => {
        this.client.say('nickserv', `identify ${pass}`);
      });
    });

  };

  addDefaultListeners () {
    this.client.addListener('message', (from, to, msg) => {
      console.log(from, to, msg);
      // if (from === this.admin && msg.startsWith('y^')) {
      if (msg.startsWith('y^')) {
        this.sendMsg('yes master');
        let commands = msg.slice(3);
        let resp = utils.parseOptions(commands);
        this.sendMsg(resp);
      };
    });
  };

  sendMsg (msg) {
    this.client.say(this.defaultChannel, msg);
  };
};

module.exports = IrcBot;
