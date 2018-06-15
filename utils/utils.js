let parseOptions = (string) => {
  let args = string.split(' ');
  let resp = '';
  if (args.length === 1) {
    let arg = args[0];
    switch (arg) {
      case 'joke':
        resp = 'beboop knock knokaer**4hdl1- bzzt bztt error';
        break;
      case 'help':
        resp = 'beboop sorry bud i dont know either';
        break;
      default:
        resp = 'beboop say what?';
        break;
    };
  } else {
    resp = 'beboop I can only read one word at a time sorry :(';
  }
  return resp;
}

let logger = {
  pm: (from, to, content) => {
    console.log(`[IRC] <pm> from:${from} to:${to} content:${content}`);
  },
  msg: (from, channel, content) => {
    console.log(`[IRC] <msg> channel:${channel} from:${from} content:${content}`);
  },
  action: (content) => {
    console.log(`[ACTION] ${content}`);
  },
  response: (resp) => {
    console.log('[RESPONSE] ', resp);
  }
};


module.exports.parseOptions = parseOptions;
module.exports.logger = logger;
