// load libraries and modules
const express = require('express');
const morgan = require('morgan');
const fortuneCookie = require('fortune-cookie');

// module
module.exports = (req, res) => {
    // create an instance of the express server
    const app = express();

    // use morgan to log all requests.. using the combined form
    app.use(morgan('combined'));

    // resources and middleware routes
    // GET /api/cookie -> application/json { cookie: 'cookie-text' }
    // GET /api/cookie?count=x -> application/json [{cookie: 'cookie-text'},{..},..]
    app.get('/api/cookie', (req, res, next) => {
        const reqCount = req.query['count'];
        let retVal;
        if(reqCount && reqCount > 1) {
            retVal = [];
            for(let i=0; i<reqCount; i++) {
                const cookieText = fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)];
                retVal.push({ cookie: cookieText });
            }
        } else {
            const cookieText = fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)];
            retVal = { cookie: cookieText };
        }
        res.status(200).contentType('application/json');
        res.json(retVal);
    });

    app.use((req, res) => {
        res.redirect('/');
    });

    // no listen, pass req and res to express
    app(req, res);
}