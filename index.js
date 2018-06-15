var irc = require('irc');
// var ircBot = requre('./IrcBot/IrcBot');

let IRC_CONFIG = {
  server: 'irc.snoonet.org',
  nick: 'yoshibot',
  channels: ['#ndlug']
};

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

var client = new irc.Client(IRC_CONFIG.server, IRC_CONFIG.nick , {
  channels: IRC_CONFIG.channels,
  autoConnect: false,
});

client.addListener('message', function(from, to, msg) {
  console.log(from, to, msg);
  if (from === 'SILV3R' && msg.startsWith('y^')) {
    client.say('yes master');
    let commands = msg.slice(3);
    let resp = parseOptions(commands);
    client.say('#ndlug', resp);
  }
});

client.addListener('error', function(msg) {
  console.log(msg);
});

client.connect(3, function(rep) {
  console.log(rep);
  console.log('connected!');
  client.join('#ndlug', function(input) {
    console.log('joined ndlug');
    client.say('nickserv', 'identify password');
  });
})



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
