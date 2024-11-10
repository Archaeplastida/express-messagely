/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */


const jwt = require("jsonwebtoken"), Router = require("express").Router, router = new Router(), User = require("../models/user"), {SECRET_KEY} = require("../config"), ExpressError = require("../expressError");

router.post("/login", async (req, res, next) => {
    try{
        let {usernmae, password} = req.body;
        if(await User.authenticate(username, password)) {
            let token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        } else {
            throw new ExpressError("Invalid username/password", 400);
        }
    } catch (err) {
        return next(err);
    }
})