const express = require('express')
const PORT = process.env.PORT || 3000

const LaunchDarkly = require('launchdarkly-node-server-sdk');

var ldClient = LaunchDarkly.init(process.env.LD_SDK_KEY);

ldClient.on("ready", ()=>{
  express()
    .get('/discount', (req, res) => {
      const country = req.query.country;
      const key = req.query.key;
      const user = {
        key,
        country,
      };
      ldClient.variation("discount-flag",user).then( (flag) => {
        const data = {}
        console.log("flag value: "+flag)
          if (flag==5){
            data.content = "Congratulations! You have earned a 5% discount!"
          }
          else if (flag==10){
            data.content = "You have earned a 10% discount, use it today!"
          }
          else if (flag==15){
            data.content = "Here's a gift, a 15% discount!"
          }
          else{
            data.content = "Sorry, no discount!"
          }
        res.send(data)
      });
    })
    .get('/content', (req, res) => {
      const country = req.query.country;
      const key = req.query.key;
      const user = {
        key,
        country,
      };
      ldClient.variation("content-flag",user).then( (flag) => {
        const data = {}
        console.log("flag value: "+flag)
        if (flag){
          data.content = "New message Content"
        }
        else {
          data.content = "Old message Content"
        }
        res.send(data)
      });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
});