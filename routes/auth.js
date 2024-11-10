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