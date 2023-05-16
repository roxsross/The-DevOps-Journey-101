let express = require('express');
let app = express();


app.get('/', function (req, res) {
    res.json({ 
        products: [{
            name: "MacBook Air M2 2022 midnight 13.6", 
            price: 500
        }, {
            name: "Monitor Samsung",
            price: 100
        }, {
            name: "Keyboard",
            price: 30
        }]
    });
    res.end();
});

app.listen(3001, function () {
  console.log("app listening on port 3001!");
});

