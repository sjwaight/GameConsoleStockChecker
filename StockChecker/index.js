const checkers = require("./sitecheckers.js");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    context.log('JavaScript timer trigger function ran!', timeStamp);

    // check each of the services and write result to array

    var results = [];
    results.push(await checkers.CheckJayBee(context));
    results.push(await checkers.CheckBigDoubleU(context));
    results.push(await checkers.CheckMSAU(context));
    
    inStock = results.find(i => i.consoleAvailable === true);

    // if any sites reported as in-stock then send notification
    if(inStock != null)
    {
        context.log("Sending push notification as XBox Series X is in Stock at least in one location!");

        client.messages
            .create({
                body: 'XBox Series X in stock @ ' + inStock.pageLink,
                from: 'SWConsoleCx',
                to: process.env.MESSAGE_RECIPIENT
            })
            .then(message => context.log("Message sent with ID: " + message.sid));
    }
    else
    {
        context.log("No notifications sent: no sites listed XBox Series X as available.");
    }
};