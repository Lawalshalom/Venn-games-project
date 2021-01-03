const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const BinaryFile = require('binary-file');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post("/save-user", (req, res) => {
  const {name, age, address} = req.body;
  const user = JSON.stringify({name, age, address}) + ",";
  const myBinaryFile = new BinaryFile('./users.bin', 'a');
  myBinaryFile.open().then(function () {
    console.log('File opened');
    return myBinaryFile.writeString(user);
  })
  .then(function (string) {
    res.send({success: "user saved successfully"});
    return myBinaryFile.close();
  })
  .then(function () {
    console.log('File closed');
  })
  .catch(function (err) {
    console.log(`There was an error: ${err}`);
  });
})

app.get("/get-users", (req, res) => {
  const myBinaryFile = new BinaryFile('./users.bin', 'r');
  const buf = new Buffer(1024);
  myBinaryFile.open().then(function () {
    console.log('File opened');
    return myBinaryFile.readString(buf);
  })
  .then(function (string) {
    console.log(`File read: ${string}`);
    res.send({users: string});
    return myBinaryFile.close();
  })
  .then(function () {
    console.log('File closed');
  })
  .catch(function (err) {
    console.log(`There was an error: ${err}`);
  });
})

// Not found middleware
app.use((req, res) => {
  res.status(404).type('text').send('Not Found');
});


app.listen(6700, () => {
  console.log(`Your app is listening on port 6700`);
});