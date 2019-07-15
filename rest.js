// setup application
let express = require('express')
let Res = require('express-resource')
let app = express()


app.use(express.json())


// register REST controllers
app.resource('vuetodos', require('./controllers/vuetodo'), {id: 'id'})


app.use(express.static('public'));



// start application
app.listen(3020)
