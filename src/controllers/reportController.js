"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const report_1 = require("../models/report");
const ReportModel = mongoose.model('Report', report_1.ReportSchema);
class ReportController {
    generateReport(req, res) {
        const newReportModel = new ReportModel();
        newReportModel.save((err, report) => {
            if (err) {
                res.send(err);
            }
            else {
                const newReport = new report_1.Report(report._id, report.executionDate);
                newReport.generateReport();
                res.json(newReport);
            }
        });
    }
    getReports(req, res) {
        ReportModel.find({}, (err, reports) => {
            if (err) {
                res.send(err);
            }
            else {
                res.json(reports);
            }
        });
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=reportController.js.map