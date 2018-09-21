"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const fs = require('file-system');
const cypress = require('cypress');
const resemble = require('resemblejs');
const Schema = mongoose.Schema;
exports.ReportSchema = new Schema({
    executionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    executed: {
        type: Boolean,
        default: false
    },
    baseImage: {
        type: Buffer
    },
    modifiedImage: {
        type: Buffer
    },
    diffImage: {
        type: Buffer
    },
    diffInformation: {
        type: Schema.Types.Mixed
    }
});
class Report {
    constructor(_id, executionDate) {
        this._id = _id;
        this.executed = false;
        this.executionDate = executionDate;
        this.diffInformation = {};
    }
    generateReport() {
        try {
            this.executeScreenshotsGenerator();
        }
        catch (e) {
            console.log(e);
        }
    }
    executeScreenshotsGenerator() {
        const currentReport = this;
        cypress.run({
            spec: 'cypress/integration/colors_spec.js',
            env: {
                id: currentReport._id
            }
        }).then(() => {
            const preFileName = `generador-${currentReport._id}-pre.png`;
            const postFileName = `generador-${currentReport._id}-post.png`;
            currentReport.baseImage = fs.readFileSync(`./cypress/screenshots/colors_spec.js/${preFileName}`);
            currentReport.modifiedImage = fs.readFileSync(`./cypress/screenshots/colors_spec.js/${postFileName}`);
            resemble(`./cypress/screenshots/colors_spec.js/${preFileName}`)
                .compareTo(`./cypress/screenshots/colors_spec.js/${postFileName}`)
                .ignoreLess()
                .onComplete(function (data) {
                    currentReport.diffImage = data.getBuffer();
                    currentReport.diffInformation.misMatchPercentage = data.misMatchPercentage;
                    currentReport.diffInformation.isSameDimensions = data.isSameDimensions;
                    currentReport.diffInformation.dimensionDifference = data.dimensionDifference;
                    const ReportModel = mongoose.model('Report', exports.ReportSchema);
                    ReportModel.findById(currentReport._id, (err, report) => {
                        report.executed = true;
                        report.baseImage = currentReport.baseImage;
                        report.modifiedImage = currentReport.modifiedImage;
                        report.diffImage = currentReport.diffImage;
                        report.diffInformation = currentReport.diffInformation;
                        report.save();
                    });
                });
        });
    }
}
exports.Report = Report;
//# sourceMappingURL=report.js.map