const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const analyzeTasks = require('./analyzeTasks');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());


app.get('/', (req, res) => {
    res.status(201).send('Successful');
});


app.post("/analyze/tasks", (req,res) => {
    const inputString = req.body;
    const result = analyzeTasks(inputString);
    res.status(201).json(result);
});


// Not found middleware
app.use((req, res, next) => {
  res.status(404).type('text').send('Not Found');
});


app.listen(6700 || 3000, () => {
  console.log(`Your app is listening on port 6700`);
});