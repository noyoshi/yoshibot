var fs = require('fs');

let parseOptions = (args) => {
  let resp = '';
  if (args.length === 1) {
    let arg = args[0];
    let contents = fs.readFileSync("./utils/responses.json");
    let jsonContent = JSON.parse(contents);
    if (!jsonContent.hasOwnProperty(arg)) {
      resp = `unknown command ${arg}`;
    } else {
      resp = jsonContent[arg];
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
  mention: (from, channel, content) => {
    console.log(`[IRC] <mention> channel:${channel} from:${from} content:${content}`);
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
