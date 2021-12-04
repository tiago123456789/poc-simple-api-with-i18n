const i18n = require("./../config/i18n");

module.exports = (req, res, next) => {
    const language = req.query.lang || req.headers["accept-language"] || "en";
    req.language = language;
    req.__ = (text) => i18n.__({ phrase: text, locale: language })
    req.__n = (text, count) => i18n.__n({ phrase: text, locale: language, count })
    next();
}