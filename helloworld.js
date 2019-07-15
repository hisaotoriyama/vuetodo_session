let express = require("express");
let app = express();

app.get("/", (request, response) => {
    response.status(200).send("Hello World Great !!");
});

app.listen(3021);