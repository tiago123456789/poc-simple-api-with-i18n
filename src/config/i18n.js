const i18n = require('i18n')
const path = require("path");

i18n.configure({
    locales: ['en', 'pt'],
    directory: path.join(__dirname, "..", "..", 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang',
    api: {
        '__': 'translate',  
        '__n': 'translateN' 
    },
})

module.exports = i18n;