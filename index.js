var irc = require('irc');
// var ircBot = requre('./IrcBot/IrcBot');

let IRC_CONFIG = {
  server: 'irc.snoonet.org',
  nick: 'yoshibot-test',
  channels: ['#bots-testing']
};

// TODO send to another file
let parseOptions = (string) => {
  let args = string.split(' ');
  let resp = '';
  if (args.length === 1) {
    let arg = args[0];
    switch (arg) {
      case 'joke':
        resp = 'knock knokaer**4hdl1- bzzt bztt error';
        break;
      case 'help':
        resp = 'sorry bud i dont know either';
        break;
      default:
        resp = 'say what?';
        break;
    };
  } else {
    resp = 'cant handle that :P';
  }
  return resp;
}

class IrcBot {
  constructor (IRC_CONFIG) {
    this.channels = IRC_CONFIG.channels;
    this.server = IRC_CONFIG.server;
    this.nick = IRC_CONFIG.nick;

    this.client = new irc.Client(IRC_CONFIG.server, IRC_CONFIG.nick , {
      channels: IRC_CONFIG.channels,
      autoConnect: false,
    });

    this.client.addListener('message', (from, to, msg) => {
      console.log(from, to, msg);
      if (from === 'SILV3R' && msg.startsWith('y^')) {
        this.sendMsg('yes master');
        let commands = msg.slice(3);
        let resp = parseOptions(commands);
        this.sendMsg(resp);
      };
    });

    this.client.addListener('error', (msg) => {
      console.log(msg);
    });

    this.client.connect(10, (rep) => {
      let pass = process.env.BOT_PASS;
      console.log(pass);
      console.log(rep);
      console.log('connected!');
      this.client.join('#bots-testing', (input) => {
        let cmd = `identify ${pass}`;
        console.log('identifying using ', cmd);
        console.log('joined channel');
        this.client.say('nickserv', `identify ${pass}`);
      });
    });
  };

  sendMsg (msg) {
    this.client.say('#bots-testing', msg);
  };
};

var yoshi = new IrcBot(IRC_CONFIG);
// It takes a bit for the connection to establish -> wait until its
// ready to send msgs etc






// class IrcBot {
//   constructor(CONFIG) {
//     this.server = CONFIG.server;
//     this.nick   = CONFIG.nick;
//     this.channels = CONFIG.channels;
//   };
//
//   makeClient() {
//     this.client = new irc.Client(this.server, this.nick, {
//       channels: this.channels,
//       autoconnect: false,
//     });
//
//     this.client.connect(10, (resp) => {
//       console.log('resp= ', resp);
//     });
//
//     this.client.addListener('message', (from, to, msg) => {
//       console.log(from + ' => ' + to + ': ' + msg);
//       if (from === 'SILV3R' && msg.startsWith('y^')) {
//         this.client.say('#ndlug', 'yes master');
//         this.client.say('NickServ', 'identify password');
//       }
//     });
//
//     this.client.addListener('error', (msg) => {
//       console.log('ERROR:', msg);
//     });
//
//     this.client.addListener('pm', (from, msg) => {
//       console.log('PM recieved from: ', from, 'contains: ', msg);
//     });
//   };
//
//   joinIrc() {
//     console.log('joining channnels');
//     this.client.join(this.channels[0]);
//   };
//
//   sendMsg(msg) {
//     console.log('sending: ', msg);
//     this.client.say('#ndlug', msg);
//   };
//
// };
//
// let yoshiBot = new IrcBot(IRC_CONFIG);
// yoshiBot.makeClient();
// yoshiBot.sendMsg('hi world');

// client.join('#ndlug');
