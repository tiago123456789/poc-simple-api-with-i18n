const express = require("express");
const app = express();
require("dotenv").config()

const routesApp = require("../routes/index");
const I18nMiddleware = require("../middlewares/I18nMiddleware.js");

app.use(express.json())

app.use(I18nMiddleware);

routesApp(app)


app.listen(3000, () => {
    console.log("Server is running on address: http://localhost:3000")
})