"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes/routes");
const cors = require('cors');
class App {
    constructor() {
        console.log('ye');
        this.routes = new routes_1.Routes();
        this.mongoUrl = 'mongodb://visualregressiontesting:visualregressiontesting1@ds211143.mlab.com:11143/visualregressiontesting';
        this.app = express();
        this.app.use(cors());
        this.config();
        this.routes.routes(this.app);
        this.mongoSetup();
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