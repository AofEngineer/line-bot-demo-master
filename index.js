const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/webhook", (req, res) => {
  const reply_token = req.body.events[0].replyToken;
  const iduser = req.body.events[0].source.userId;
  reply(reply_token, iduser);
  res.sendStatus(200);
});
function reply(reply_tokens, idsuser) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer O/lEacPcXVsvQwN6JpsAFp72N4dNdSzeF9PqGhRZxILm2iYVo07PtAkOpBdmtH+5og/K1sU6XhlUQuPVmWDbyCXhxw4RfL2h77yuXxHiBEHRk+p9TGvV+qsDj59Vc3ZGtNAJPRuz5iNca2BX/Ugu4wdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    replyToken: reply_tokens,
    messages: [
      {
        type: "text",
        text: `userId: ${idsuser}`,
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  console.log({ headers, body });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}
app.listen(5001, function () {
  console.log(`Server Listen on port 5001`);
});
