const checkers = require("./sitecheckers.js");
const azure = require('azure-sb');

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
        
        var notificationHubService = azure.createNotificationHubService(process.env.HubName, process.env.NotificationHubConnection);
    
        var payload = '<toast><visual><binding template="ToastText01"><text id="1">XBox Series X in stock @ ' + inStock.pageLink + '</text></binding></visual></toast>';
        notificationHubService.wns.send(null, payload , 'wns/toast', function(error){
            if(!error){
                context.log("Sucessfully sent push notification as XBox Series X is in stock!");
            }
            else
            {
                context.log("Error sending pushing notification: " + error.message);
            }
        });
    }
    else
    {
        context.log("No notifications sent: no sites listed XBox Series X as available.");
    }
};