function(properties, context) {
  const { Client_Id, Client_Secret } = context.keys;

  const platformIds = {
    Tiktok: "de55aeec-0dc8-4119-bf90-16b3d1f0c987",
    Instagram: "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
    Twitter: "7645460a-96e0-4192-a3ce-a1fc30641f72",
    Youtube: "14d9ddf5-51c6-415e-bde6-f8ed36ad7054",
    Substack: "fbf76083-710b-439a-8b8c-956f607ef2c1",
    Twitch: "e4de6c01-5b78-4fc0-a651-24f44134457b",
    Discord: "3f996edf-fec1-4be7-bb53-f9b649f41058",
    Pintrest: "9c5b1cf1-23f1-4d40-b0ea-40f9bf615801",
    Facebook: "ad2fec62-2987-40a0-89fb-23485972598c",
  };

  const config = {
    clientDisplayName: properties.clientDisplayName,
    environment: properties.environment,
    userId: properties.userId,
    token: properties.userToken,
    workPlatformId: platformIds[properties.workPlatformId],
  };

  const phylloConnect = window.PhylloConnect.initialize(config);

  phylloConnect.on("accountConnected", (accountId, workplatformId, userId) => {
    // gives the successfully connected account ID and work platform ID for the given user ID
    console.log(
      `onAccountConnected: ${accountId}, ${workplatformId}, ${userId}`
    );
  });
  phylloConnect.on(
    "accountDisconnected",
    (accountId, workplatformId, userId) => {
      // gives the successfully disconnected account ID and work platform ID for the given user ID
      console.log(
        `onAccountDisconnected: ${accountId}, ${workplatformId}, ${userId}`
      );
    }
  );
  phylloConnect.on("tokenExpired", (userId) => {
    // gives the user ID for which the token has expired
    console.log(`onTokenExpired: ${userId}`); // the SDK closes automatically in case the token has expired, and you need to handle this by showing an appropriate UI and messaging to the users
  });
  phylloConnect.on("exit", (reason, userId) => {
    // indicates that the user with given user ID has closed the SDK and gives an appropriate reason for it
    console.log(`onExit: ${reason}, ${userId}`);
  });
  phylloConnect.on("connectionFailure", (reason, workplatformId, userId) => {
    // optional, indicates that the user with given user ID has attempted connecting to the work platform but resulted in a failure and gives an appropriate reason for it
    console.log(`onConnectionFailure: ${reason}, ${workplatformId}, ${userId}`);
  });

  phylloConnect.open();
}
