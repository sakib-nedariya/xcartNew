const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Routes = require("./routes/index")

dotenv.config();

app.use(cors());
app.use(express.json());  // For JSON payloads
app.use(express.urlencoded({ extended: true }));  // For form-data payloads
app.use(bodyParser.json());  // For JSON payloads (can actually remove this, as express.json() does the same)

app.use(Routes);

app.get("/", (req, res) => {
  return res.json("XCART server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});
