const ejs = require("ejs");
const nodemailer = require("nodemailer")

class Email {

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        this.subject;
        this.from;
        this.to;
        this.text;
    }

    withSubject(subject) {
        this.subject = subject;
        return this;
    }

    withFrom(from) {
        this.from = from;
        return this;
    }

    withTo(to) {
        this.to = to;
        return this;
    }

    withText(text) {
        this.text = text;
        return this;
    }

    sendText() {
        return this.transport.sendMail({
            from: this.from,
            to: this.to,
            subject: this.subject,
            text: this.text,
        });
    }

    sendWithTemplate(template, data, isTrackOpenEmail = false) {
        return new Promise((resolve, reject) => {

            ejs.renderFile(
                template, data,
                async (error, html) => {
                    if (error) return reject(error);

                    if (isTrackOpenEmail) {
                        html += "<img src='http://localhost:3000/open-tracks'>"
                    }

                    const transport = nodemailer.createTransport({
                        host: "smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                            user: "1a6a3b83aecf2b",
                            pass: "5854ccc5617e81"
                        }
                    });

                    let info = await transport.sendMail({
                        from: this.from,
                        to: this.to,
                        subject: this.subject,
                        text: this.text,
                        html: html
                    });

                    resolve(info);
                })
        })
    }
}

module.exports = Email