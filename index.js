// index.js
require('dotenv').config();
var express = require('express');
var app = express();

// Enable CORS so freeCodeCamp can test the API
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Boilerplate example endpoint (safe to keep)
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp endpoint. The "?" makes :date optional.
app.get('/api/:date?', function (req, res) {
  const { date } = req.params;
  let parsed;

  if (date === undefined) {
    parsed = new Date(); // empty parameter: current time
  } else if (/^-?\d+$/.test(date)) {
    parsed = new Date(Number(date)); // all digits: Unix time in milliseconds
  } else {
    parsed = new Date(date); // anything else: a date string
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString(),
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});