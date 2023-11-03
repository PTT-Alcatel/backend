// Load the SDK
let RainbowSDK = require("rainbow-node-sdk");
let dotenv = require('dotenv');
dotenv.config();

// Define your configuration
let options = {
    "rainbow": {
        "host": "sandbox"
    },
    "credentials": {
        "login": process.env.RAINBOW_LOGIN, // To replace by your developer credendials
        "password": process.env.RAINBOW_PASSWORD, // To replace by your developer credentials
    },
    // Application identifier
    "application": {
        "appID": "aaf7ac80586a11eeb9bcbddd6a98e1ed",
        "appSecret": "HnwcPWFwKrVV0DUNZOpgyCJSiXMJd5UJlP6JHNjK0y8jsBJ8tBPYj927wqRTXSI7"
    },
    // Logs options
    "logs": {
        "enableConsoleLogs": true,
        "enableFileLogs": false,
        "color": true,
        "level": 'debug',
        "system-dev": {
            "internals": false,
            "http": false,
        }, 
        "file": {
            "path": "/var/tmp/rainbowsdk/",
            "customFileName": "R-SDK-Node-Sample2",
            "level": "debug",
            "zippedArchive" : false/*,
            maxSize : '10m',
            maxFiles : 10 // */
        }
    },
    // IM options
    "im": {
        "sendReadReceipt": true,
        "messageMaxLength": 1024, // the maximum size of IM messages sent. Note that this value must be under 1024.
        "sendMessageToConnectedUser": false, // When it is setted to false it forbid to send message to the connected user. This avoid a bot to auto send messages.
        "conversationsRetrievedFormat": "small", // It allows to set the quantity of datas retrieved when SDK get conversations from server. Value can be "small" of "full"
        "storeMessages": true, // Define a server side behaviour with the messages sent. When true, the messages are stored, else messages are only available on the fly. They can not be retrieved later.
        "nbMaxConversations": 15, // parameter to set the maximum number of conversations to keep (defaut value to 15). Old ones are removed from XMPP server. They are not destroyed. The can be activated again with a send to the conversation again.
        "rateLimitPerHour": 1000, // Set the maximum count of stanza messages of type `message` sent during one hour. The counter is started at startup, and reseted every hour.
        "messagesDataStore": RainbowSDK.DataStoreType.StoreTwinSide // Parameter to override the storeMessages parameter of the SDK to define the behaviour of the storage of the messages (Enum DataStoreType in lib/config/config , default value "DataStoreType.UsestoreMessagesField" so it follows the storeMessages behaviour)<br>
                              // DataStoreType.NoStore Tell the server to NOT store the messages for delay distribution or for history of the bot and the contact.<br>
                              // DataStoreType.NoPermanentStore Tell the server to NOT store the messages for history of the bot and the contact. But being stored temporarily as a normal part of delivery (e.g. if the recipient is offline at the time of sending).<br>
                              // DataStoreType.StoreTwinSide The messages are fully stored.<br>
                              // DataStoreType.UsestoreMessagesField to follow the storeMessages SDK's parameter behaviour. 
    }
};

// Instantiate the SDK
let rainbowSDK = new RainbowSDK(options);

// Start the SDK
rainbowSDK.start();