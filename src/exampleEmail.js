require("dotenv").config()

const app = require("express")()

const Email = require("./email/email")


app.get("/send", (request, response) => {

    new Email()
        .withFrom("tiagorosada@gmail.com")
        .withSubject("Teste")
        .withText("Welcome the application")
        .withTo("tiago@gmail.com")
        .withText("Email com apenas texto")
        .sendText()
        // .sendWithTemplate("./views/welcome.ejs", {
        //     name: 'Tiago video explicando como enviar email',
        //     link: "https://youtube.com.br",
        //     translate: {
        //         __: (text) => text
        //     }
        // }, true, true)
        .then(() => response.json({ "message": "Email sended success" }))
})


app.get("/open-tracks", (request, response) => {
    // Someone logic here
    console.log("Opened email")
    const buffer = new Buffer(35);
    response.writeHead(200, { "Content-Type": "image/gif" });
    response.end(buffer, "binary");
})

app.get("/tracks/click", (request, response) => {
    const link = request.query.url;
    if (!link) {
        response.status(404).json({ msg: "Address url not found!" });
    }

    // Someone logic here
    console.log("Clicked link %s", link)
    response.writeHead(302, {
        'Location': link // https://youtube.com.br
    })
    response.end();
})

app.listen(3000, () => console.log("Server is running http://localhost:3000"))
