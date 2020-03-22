const functions = require('firebase-functions');
const request = require('request-promise');
const admin = require('firebase-admin');
admin.initializeApp();
const WEBHOOK_URL = 'https://hooks.slack.com/services/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'
var headers = {
	'Content-type': 'application/json'
};


exports.webhook = functions.database.ref('/maker/{updateOrder}').onCreate((snapshot, context) => {
  let data = snapshot.toJSON();
  let address = data.address;
  let comments = data.comments;
  let email = data.email;
  let name = data.name;
  let phone_number = data.phone_number;
  var body = {
    "channel": "#creating-a-proof-of-concept-slackbot",
    "username": "test_app",
    "icon_emoji": ":computer:",
    "text": `Order from ${name} at ${phone_number}, deliver to ${address}`
  };

  return request({
    uri: WEBHOOK_URL,
    method: 'POST',
    body: body,
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    if (response.statusCode >= 400) {
      console.log("you threw the thrown error!");
      throw new Error(`HTTP Error: ${response.statusCode}`);
    }
    console.log('SUCCESS! Posted', snapshot.val());
    return null
  });
});