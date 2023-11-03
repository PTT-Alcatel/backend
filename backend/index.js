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
        "enableConsoleLogs": false,
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

rainbowSDK.events.on('rainbow_onstarted', function() {
    // do something when the SDK has successfully started (the object is contructed, but the bot is not yet signed in, and the SDK's APIs are not ready to be used)
    console.log("Rainbow SDK is started!");
});

rainbowSDK.events.on('rainbow_onconnected', function() {
    // do something when the connection to Rainbow XMPP server is successfull (signin complete, but data for initialisation not yet retrieved)
    console.log("Rainbow SDK is connected!");
});

rainbowSDK.events.on('rainbow_onready', function() {
    // do something when the SDK is connected to Rainbow. It is this event which allows application to start the use of SDK's APIs.
    console.log("Rainbow SDK is ready!");
});

rainbowSDK.events.on('rainbow_onconnectionerror', function(err) {
    // do something when the connection can't be done with Rainbow (ie. issue on sign-in) 
    // Application must start the sdk again.
    console.log("Error when connecting to Rainbow: ", err);
});

rainbowSDK.events.on('rainbow_onfailed', function(err) {
    // do something when the SDK didn't succeed to reconnect and stop trying
    // Application must start the sdk again.
    console.log("Error when reconnecting to Rainbow: ", err);
});

rainbowSDK.events.on('rainbow_onerror', function(err) {
    // do something when something goes fatal on Xmpp server (ie: bad 'configurations' parameter...). 
    // Application must start the sdk again.
    console.log("Error when connecting to Rainbow (XMPP server): ", err);
});