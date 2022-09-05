const express = require('express');

let app = express();

app.use(express.static('./frontend'))

const port = 8000;
let server = app.listen(port, function () {
   console.log("http://localhost:%s", port)
})
