import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_SECRET"),
        scopes: ["profile", "email"],
        attributeMapping: {
          email: "email",
          preferredUsername: "name"
        },
      },
      callbackUrls: [
        "http://localhost:5173/landing",

      ],
      logoutUrls: [
        "http://localhost:5173/",

      ],
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true
    }
  }
});

