require('dotenv').config()
const configuration = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
}

const app = require('express')()
const line = require('@line/bot-sdk')
const client = new line.Client(configuration)
const simsimi = require('simsimi')({
  key: 'dvec0y_HN_vRESF_EJpnmEq.EDA_D4O3kun1pdGQ',
});
app.get('/', function(req, res){
  simsimi('Hi')
  .then(response => {
    console.log('simsimi say:', response); // What's up ?
  });
  res.status(200).send('demo chat bot')
})

app.post('/event', line.middleware(configuration), function(req, res){
  const test = [{
    type: "template",
    altText: "questions template",
    template: {
      type: "buttons",
      imageSize: "contain",
      title: "基本的注意に記載の副作用（発汗減少に伴う熱中症）",
      text: "次のような症状が出ることがありますか？ めまい、筋肉の痛み、手足がつる、頭痛、嘔吐、体がだるい、体に力が入らない、集中できない、けいれん、もうろうとする",
      actions: [{
        type: "postback",
        label: "あります",
        text: "あります",
        data: "{\"buttonType\":\"postback\",\"masterAnswerId\":\"707f098f-46d2-4090-b89a-bf404d10aa52\"}"
      }, {
        type: "postback",
        label: "ありません",
        text: "ありません",
        data: "{\"buttonType\":\"postback\",\"masterAnswerId\":\"80b42057-3fc4-42aa-b4dc-2dc3c4d5d6c5\"}"
      }]
    }
  }];

    test.map(event => {
        // simsimi(event.message.text)
        //   .then(response => {
        //     if (res)
        //     client.replyMessage(event.replyToken, {type: 'text', text: response}, false)
        //   });

            client.replyMessage(event.replyToken, {type: 'text', text: "response"}, false)

    })
    console.log(req.body.events);
    res.status(200).send('demo chat bot')
})

console.log("server started.........................................");
app.listen(process.env.PORT)