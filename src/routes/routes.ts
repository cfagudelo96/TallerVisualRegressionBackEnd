import { Request, Response } from 'express';

import { ReportController } from '../controllers/reportController';

export class Routes {
    
    reportController: ReportController = new ReportController();
    
    public routes(app) {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Ready to go'
            });
        });

        app.route('/reports')
           .get(this.reportController.getReports)
           .post(this.reportController.generateReport);
    }
}
