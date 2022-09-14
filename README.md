# launchdarkly-test
Server that implements LD SDK


I have created an app that implements two feature flags. 
It returns content and implements a feature flag to be able to send different contents depending on the flag value with a percentage rollout. 
This app also returns price discounts, by targeting users depending of specific rules set on another feature flag.

The app is Deployed on Heroku, you can access it by this public API, with two endpoints, /Discount and  /content:
https://frozen-earth-53956.herokuapp.com

There are two query params used by both the targeting feature flags I have built:
 - key: user unique identificator
 - country: a country code

1) Discount Endpoint:
The rule targets users by their country, providing different discount percentage depending on their country code. If users are from FR, US, ES or non of them, it provides a discount.
When testing, make sure to change the key, if not, you will get the same response from the server.

Example:

curl -X GET [https://frozen-earth-53956.herokuapp.com/content?country=ES&key=1234](https://frozen-earth-53956.herokuapp.com/discount?country=FR&key=sdsds)

When the flag is true for rule 1, country = US or FR, it will return

{
  {"content":"Congratulations! You have earned a 5% discount!"}
}

When the flag is true for rule 2, country = ES, it will return

{
  "content" = "You have earned a 10% discount, use it today!"
}
 
When the flag is true for rule 3, country != (US, FR, ES), it will return

{
  "content" = "Here's a gift, a 15% discount!"
}

When the flag is false, it will return

{
  "content" = "Sorry, no discount!"
}

2) Content Endpoint:
The rule targets users with 'ES' country code and uses a percentage rollout logic that generates a hash based on the flag's key.
When testing, make sure to change the key, if not, you will get the same response from the server.

Example:

curl -X GET [https://frozen-earth-53956.herokuapp.com/content?country=ES&key=1234](https://frozen-earth-53956.herokuapp.com/content?country=FR&key=sdsds)

When the flag is true, it will return

{
  "content" = "New message Content"
}

when false it will return

{
  "content" = "Old message Content"
}
 

