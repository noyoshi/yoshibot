class IrcBot {
  constructor(CONFIG) {
    this.server = CONFIG.server;
    this.nick   = CONFIG.nick;
    this.channels = CONFIG.channels;
  };

  makeClient() {
    this.client = new irc.Client(this.server, this.nick, {
      channels: this.channels,
    });

    this.client.addListener('message', (from, to, msg) => {
      console.log(from + ' => ' + to + ': ' + msg);
    });

    this.client.addListener('error', (msg) => {
      console.log('ERROR:', msg);
    });

    this.client.addListener('pm', (from, msg) => {
      console.log('PM recieved from: ', from, 'contains: ', msg);
    });
  };

  joinIrc() {
    console.log('joining channnels');
    this.client.join(this.channels[0]);
  };

  sendMsg(msg) {
    console.log('sending: ', msg);
    this.client.say(msg);
  };

};
