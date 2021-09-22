# Console Stock Checker Sample App

The code in this repository demonstrates how you can use [Azure Functions](https://azure.microsoft.com/en-au/services/functions/), [Nodejs](https://nodejs.org/) (14 LTS) and [Playwright](https://playwright.dev/) to track when a popular gaming console (XBox Series X) is in stock with online retailers.

This codebase includes three demonstration Australian retailers, but there are many others, including outside of Australia.

Once a retailer is found to have stock available, the Azure Function then uses Twilio's SMS API to send a message to designated mobile phone number, which includes a link to the product page.

There is also a second Function that can be invoked via a webhook call from Twilio that is used to turn the checker on and off simply by sending a text message ('Pause' to stop and 'Start' to start). This Function updates a Azure Table Storage entry which is used as an input binding for the main console checker Function.

If you want to understand more about how this solution works, and what it is designed to do then check out this [blog post](https://blog.siliconvalve.com/2021/09/22/build-a-serverless-gaming-console-stock-checker-with-playwright-azure-functions-and-twilio/).

If you want to run and debug this Azure Functions project on your computer you will need: VSCode, Node 14 and the Azure Functions Core Tools (Windows, Mac or Linux).

To fully debug you will require an Azure subscription and a Twilio account (they have a [free trial](https://www.twilio.com/try-twilio) if you've not used before) where you have provisioned a Storage Account and an Azure Notification Hub instance.

Create a `local.settings.json` file and set it up as follows:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=https;AccountName=YOUR_ACCOUNTAccountKey=YOUR_ACCOUNT_KEY;EndpointSuffix=core.windows.net",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "TWILIO_ACCOUNT_SID": "AC3XXXXXXXXXXXXXXXXXX",
    "TWILIO_AUTH_TOKEN": "XXXXXXXXXXX",
    "MESSAGE_RECIPIENT": "+614XXXXXXXX",
    "MESSAGE_SENDER": "+61XXXXXXXX"
  }
}
```