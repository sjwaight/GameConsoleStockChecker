# Console Stock Checker Sample App

The code in this repository demonstrates how you can use Azure Functions, Nodejs and Playwright to track when a popular gaming console is in stock with online retailers.

There are three demonstration Australia retailers included, but there are many others, including outside of Australia.

Once a retailer is found to have stock available, the Azure Function then uses Azure Notification Hub to send a push notification to registered Windows clients (these could also be Apple or Androind devices if needed).

Further details to come.

If you want to run and debug this Azure Functions project on your computer you will need: VSCode, Node 14 and the Azure Functions Core Tools.

To fully debug you will require an Azure subscription where you have provisioned a Storage Account and an Azure Notification Hub instance.

Create a `local.settings.json` file and set it up as follows:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=YOUR_ACCOUNTAccountKey=YOUR_ACCOUNT_KEY;EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "NotificationHubConnection": "Endpoint=sb://YOUR_HUB_NAMESPACE.servicebus.windows.net/;SharedAccessKeyName=YOUR_HUB_SENDONLY_POLICY;SharedAccessKey=YOUR_HUB_SENDONLY_KEY",
    "HubName": "YOUR_HUB_NAME"
  }
}
```