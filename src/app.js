"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs = require("shelljs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes/routes");
const cors = require('cors');
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.mongoUrl = 'mongodb://visualregressiontesting:visualregressiontesting1@ds211143.mlab.com:11143/visualregressiontesting';
        this.app = express();
        this.app.use(cors());
        this.config();
        this.routes.routes(this.app);
        this.mongoSetup();
        
        shelljs.exec('apt-get update', { async: true });
        shelljs.exec('apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2', { async: true });
        shelljs.exec('npm install cypress', { async: true });
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map