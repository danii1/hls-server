var express = require("express");
var cors = require("cors");

var app = express();
const port = 8000;

app.use(cors());

app.use("/streams", express.static("streams"));
app.use("/", express.static("keys"));

app.listen(port, () => {
	console.log(`HLS server is listening at http://localhost:${port}`);
});
