# launchdarkly-test
Server that implements LD SDK


I have created an app using LD, that allows targeting users with percentage rollouts feature flags.

The app is Deployed on Heroku, you can access it by this public API:
https://frozen-earth-53956.herokuapp.com

When you set up a percentage rollout, each user receives a particular variation based on their user key.

The percentage rollout logic generates a hash based on both user attributes and the flag's key.
When testing, make sure to change the key, if not, you will get the same response from the server.

There are two query params used by the targeting feature flag I have built:
 - key: user unique identificator
 - country: a country code

The rule targets users with 'ES' country code

Example:

curl -X GET https://frozen-earth-53956.herokuapp.com?country=ES&key=1234
