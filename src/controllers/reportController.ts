import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

import { ReportSchema, Report } from '../models/report';

const ReportModel = mongoose.model('Report', ReportSchema);

export class ReportController {
  generateReport(req: Request, res: Response) {
    const newReportModel = new ReportModel();
    newReportModel.save((err, report) => {
      if (err) {
        res.send(err);
      } else {
        const newReport: Report = new Report(report._id, report.executionDate);
        newReport.generateReport();
        res.json(newReport);
      }
    });
  }

  getReports(req: Request, res: Response) {
    ReportModel.find({}, (err, reports) => {
      if(err) {
        res.send(err);
      } else {
        res.json(reports);
      }
    });
  }
}
