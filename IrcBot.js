var irc = require('irc');
var utils = require('./utils/utils');
var twilio = require('twilio');


class IrcBot {
  constructor (config) {
    this.channels = config.channels;
    this.server = config.server;
    this.nick = config.nick;
    this.admin = config.admin;
    this.defaultChannel = this.channels[0];
    this.adminConfig = {
      away: "false",
      text: "false"
    };

    this.client = new irc.Client(this.server, this.nick , {
      channels: this.channels,
      autoConnect: false,
    });
  };

  connect () {
    // Need to add error listener else program will die if connected fails
    // and cannot handle error message
    // TODO add in error handling for password login
    this.client.addListener('error', (msg) => {
      console.log('ERROR => ', msg);
    });

    this.client.connect(10, (resp) => {
      let pass = process.env.BOT_PASS;

      if (pass == null) {
        throw new Error('BOT_PASS env variable not defined');
      }
      utils.logger.action(`logging in using password: ${pass}`);
      utils.logger.response(resp);
      // TODO refactor how this joins channels?
      this.client.join(this.defaultChannel, (input) => {
        this.sendPm('nickserv', `identify ${pass}`);
      });
    });

  };

  addDefaultListeners () {
    this.client.addListener('message', (from, to, message) => {
      if (!to.startsWith('#')) return;

      let msg = message.trim();

      utils.logger.msg(from, to, msg);

      let splitMsg = msg.split(' ');
      if (splitMsg.indexOf(this.admin) >= 0 || splitMsg.indexOf(this.admin + ":") >= 0) {
        utils.logger.mention(from, to, msg);
        // Wttr.in, twilio,

        let accountSID = process.env.TWILIO_SID;
        let accountToken = process.env.TWILIO_AUTH_TOKEN;
        // console.log(accountSID, accountToken);
        let client = new twilio(accountSID, accountToken);

        client.messages.create({
          body: `MSG from ${from}: ${msg}`,
          to: "+17857668047",
          from: "+19132988636"
        })
        .then((message) => console.log(`MESSAGE SENT WITH SID: ${message}`));

      };

      if (msg.startsWith('y^')) {
        let _ = splitMsg.splice(0, 1);
        console.log(splitMsg);
        let resp = utils.parseOptions(splitMsg);
        this.sendMsg(resp);
      };
    });

    this.client.addListener('pm', (from, msg) => {
      utils.logger.pm(from, this.nick, msg);
      this.sendPm(from, 'Hi, I do not support PMs right now. Sorry!');
    });
  };

  sendMsg (msg) {
    this.client.say(this.defaultChannel, msg);
    utils.logger.msg(this.nick, this.defaultChannel, msg);
  };

  sendPm (nick, msg) {
    this.client.say(nick, msg);
    utils.logger.pm(this.nick, nick, msg);
  }
};

module.exports = IrcBot;
