"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reportController_1 = require("../controllers/reportController");
class Routes {
    constructor() {
        this.reportController = new reportController_1.ReportController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'Ready to go'
            });
        });
        app.route('/reports')
            .get(this.reportController.getReports)
            .post(this.reportController.generateReport);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map