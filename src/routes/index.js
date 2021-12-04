const jwt = require("jsonwebtoken")
const CodeMessage = require("../contants/CodeMessage");
const Email = require("../email/email");
const i18n = require("../config/i18n")
const HasAuthenticated = require("../middlewares/HasAuthenticated");

module.exports = (app) => {

    app.post("/auth/login", (req, res) => {
        const credential = req.body;
        if (!credential.email || !credential.password) {
            return res.json({ message: req.__(CodeMessage.CREDENTIAL_INVALID) })
        }

        const accessToken = jwt.sign({ email: credential.email }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.json({ accessToken })
    });

    app.post("/auth/register", (req, res) => {
        const errors = {}
        const credential = req.body;
        if (!credential.name) {
            errors["name"] = req.__(CodeMessage.NAME_REQUIRED)
        }

        if (!credential.email) {
            errors["email"] = req.__(CodeMessage.EMAIL_REQUIRED)
        }

        if (!credential.password) {
            errors["password"] = req.__(CodeMessage.PASSWORD_REQUIRED)
        }

        const isInvalidData = Object.keys(errors).length > 0
        if (isInvalidData) {
            return res.status(400).json({ message: errors })
        }

        new Email()
            .withFrom("tiagorosada@gmail.com")
            .withSubject(req.__("welcome"))
            .withText("Welcome the application")
            .withTo("tiago@gmail.com")
            .sendWithTemplate("./views/welcome.ejs", {
                name: credential.name,
                link: "youtube.com.br",
                translate: {
                    __: (text) => i18n.__({ phrase: text, locale: req.language })
                }
            })
        return res.sendStatus(201);
    })


    app.get("/welcome", HasAuthenticated, (req, res) => {
        res.json({ message: req.__(CodeMessage.WELCOME) })
    })
}