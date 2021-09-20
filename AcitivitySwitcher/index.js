const azure = require('azure-storage');


module.exports = async function (context, req) {

    const textMessageBody = req.body;
    const responseMessage = "";
    const responseCode = 200;

    if(textMessageBody.toLowerCase().includes("start") || textMessageBody.toLowerCase().includes("pause"))
    {
        context.log('Found a control message match in SMS, so will update Table Storage.');

        var tableSvc = azure.createTableService(connectionString=process.env.AzureWebJobsStorage);

        var newStatus = 'true';        

        if(textMessageBody.toLowerCase().includes("pause"))
            newStatus = 'false';
        
        var entGen = azure.TableUtilities.entityGenerator;
        var serviceStatus = {
            PartitionKey: entGen.String('consolechecker'),
            RowKey: entGen.String('isenabled'),
            state: entGen.Boolean(newStatus)
        };

        tableSvc.replaceEntity('jobcontrol', serviceStatus, function(error, result, response){
            if(!error) {
                context.log("Failed to replace table entity!");
                responseMessage = "Couldn't disable SMS send.";
                responseCode = 500;
            }
        });

        responseMessage = `SMS running: ${newStatus}`;
    }

    context.res = {
        status: responseCode,
        body: responseMessage
    };
}