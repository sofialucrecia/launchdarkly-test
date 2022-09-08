# launchdarkly-test
Server that implements LD SDK


I have created an app that returns content and implements a feature flag to be able to send different contents depending on the flag value

The app is Deployed on Heroku, you can access it by this public API:
https://frozen-earth-53956.herokuapp.com

There are two query params used by the targeting feature flag I have built:
 - key: user unique identificator
 - country: a country code

The rule targets users with 'ES' country code and uses a percentage rollout logic that generates a hash based on the flag's key.
When testing, make sure to change the key, if not, you will get the same response from the server.

Example:

curl -X GET https://frozen-earth-53956.herokuapp.com?country=ES&key=1234

When the flag is true, it will return

{
  "content" = "new testing content!"
}

when false it will return

{
  "content" = "original content"
}
