// setup application
let express = require('express')
let app = express()

app.use(express.static('public'));

// start application
app.listen(3020)