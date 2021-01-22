var express = require("express");
var cors = require("cors");
var fs = require("fs").promises;
var crypto = require("crypto");

var app = express();
const port = 8000;

app.use(cors());
app.use("/streams", express.static("streams"));

app.get("/keys/:keyId", (req, res) => {
  console.log(req.headers);
  // x-playback-session-id is used here to block browser extensions from downloading key file.
  // Browsers where HLS is natively supported(Safari) will use this header by default.
  // Browsers without native HLS support should setup this header through xhrSetup function in hls.js.
  // Android browsers and our app on Android has native HLS support but don't send "x-playback-session-id" header,
  // so use user-agent to check if we serve key file for them
  if (
    !req.headers["x-playback-session-id"] &&
    !req.headers["user-agent"].includes("Android") &&
    !req.headers["user-agent"].includes("ExoPlayer")
  )
    return res
      .status(451) // send "unavailable for legal reasons" status code
      .send(
        "Downloading this resource requires permission of the copyright owner."
      );

  fs.readFile(`${__dirname}/keys/${req.params.keyId}.key`)
    .then((contents) => {
      return res.send(contents);
    })
    .catch((error) => res.status(404).send(error));
});

app.listen(port, () => {
  console.log(`HLS server is listening at http://localhost:${port}`);
});
