const express = require('express');

const PORT = 8080;
const message = (process.env.MESSAGE) ? process.env.MESSAGE : 'Nothing important';

const app = express();
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World\n');
});

app.listen(PORT);

console.log(`Message: ${message}`);
console.log(`Running on http://localhost ${PORT}`);