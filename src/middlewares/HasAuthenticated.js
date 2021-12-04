const CodeMessage = require("../contants/CodeMessage")

module.exports = (req, res, next) => {
    try {
        let accessToken = req.headers["authorization"]
        if (!accessToken) {
            return res.status(403).json({ message: req.__(CodeMessage.UNAUTHORIZATED) })
        }
        
        accessToken = accessToken.replace("Bearer ", "")
        jwt.verify(accessToken, process.env.JWT_SECRET)
        next();
    } catch(error) {
        return res.status(403).json({ message: req.__(CodeMessage.UNAUTHORIZATED) })
    }
}