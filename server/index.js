const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Routes = require("./routes/index");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Routes);

app.get("/", (req, res) => {
  res.json("XCART server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on port ${process.env.PORT}`);
});
