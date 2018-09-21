import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

import { Routes } from './routes/routes';

const cors = require('cors');

class App {
  app: express.Application;
  routes: Routes = new Routes();

  mongoUrl: String = 'mongodb://visualregressiontesting:' + process.env.DBPASS + '@ds211143.mlab.com:11143/visualregressiontesting';

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    this.routes.routes(this.app);
    this.mongoSetup();
  }

  private config() {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
