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

module.exports.parseOptions = parseOptions; 
