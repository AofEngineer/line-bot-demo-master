const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const lineevent = req.body.events[0];
  if (lineevent === undefined) return res.sendStatus(200);
  console.log(lineevent);
  reply(lineevent);
  res.sendStatus(200);
});

const reply = (e) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer O/lEacPcXVsvQwN6JpsAFp72N4dNdSzeF9PqGhRZxILm2iYVo07PtAkOpBdmtH+5og/K1sU6XhlUQuPVmWDbyCXhxw4RfL2h77yuXxHiBEHRk+p9TGvV+qsDj59Vc3ZGtNAJPRuz5iNca2BX/Ugu4wdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    replyToken: e.replyToken,
    messages: [
      {
        type: "text",
        text: `userId: ${e.source.userId}`,
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  console.log({ headers, body });
  if (e.message.text === "ลงทะเบียน") {
    post(headers, body);
  }
};

const post = (headers, body) => {
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
};

app.listen(5000, function () {
  console.log(`Server Listen on port 5000`);
});
