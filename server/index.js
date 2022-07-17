const express = require("express"); //express 모듈 호출
const app = express();  //function을 이용해 새로운 express app을 만듦
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const port = process.env.PORT || 5000;

//mongoDB 연결
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true//, useCreateIndex: true, useFindAndModify: false -> 옵션 주는 부분
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));

app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});