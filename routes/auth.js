const jwt = require("jsonwebtoken"), Router = require("express").Router, router = new Router(), User = require("../models/user"), { SECRET_KEY } = require("../config"), ExpressError = require("../expressError");

//logs user in if correct username and password is given, then returning a token.
router.post("/login", async (req, res, next) => {
    try {
        let { username, password } = req.body;
        if (await User.authenticate(username, password)) {
            let token = jwt.sign({ username }, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({ token });
        } else {
            throw new ExpressError("Invalid username/password", 400);
        }
    } catch (err) {
        return next(err);
    }
})

//register user by registering, logging in, then returning the token.
router.post("/register", async (req, res, next) => {
    try {
        let { username } = await User.register(req.body);
        let token = jwt.sign({ username }, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
})

module.exports = router;