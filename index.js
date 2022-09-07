const express = require('express')
const PORT = process.env.PORT || 3000

const LaunchDarkly = require('launchdarkly-node-server-sdk');

var ldClient = LaunchDarkly.init(process.env.LD_SDK_KEY);

ldClient.on("ready", ()=>{
  express()
    .get('/', (req, res) => {
      const country = req.query.country;
      const name = req.query.name;
      const key = req.query.key;
      const user = {
        name,
        key,
        country,
      };
      ldClient.variation("enable-toggle-runner",user).then( (flag) => {
        const data = {}
        if(flag){
          data.content = "new testing content!"
        } else{
          data.content = "original content"
        }
        res.send(data)
      });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
});