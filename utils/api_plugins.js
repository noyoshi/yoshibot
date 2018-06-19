// Wttr.in, twilio,
var twilio = require('twilio');

let accountSID = process.env.TWILIO_SID;
let accountToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSID, accountToken);
let client = new twilio(accountSID, accountToken);

client.messages.create({
  body: "Hi from node",
  to: "+17857668047",
  from: "+19132988636"
})
.then((message) => console.log(`MESSAGE SENT WITH SID: ${message}`));
