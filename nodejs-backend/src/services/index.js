const employeeAppraisal = require("./employeeAppraisal/employeeAppraisal.service.js");
const employeeAppraisalRemarks = require("./employeeAppraisalRemarks/employeeAppraisalRemarks.service.js");
const employeeAppraisalReview = require("./employeeAppraisalReview/employeeAppraisalReview.service.js");
const employeeCompetenciesscore = require("./employeeCompetenciesscore/employeeCompetenciesscore.service.js");
const employeeKPIRateRange = require("./employeeKPIRateRange/employeeKPIRateRange.service.js");
const employeeKRAScore = require("./employeeKRAScore/employeeKRAScore.service.js");
const employeeTraining = require("./employeeTraining/employeeTraining.service.js");
const parSession = require("./parSession/parSession.service.js");
const rateReview = require("./rateReview/rateReview.service.js");
const kra = require("./kra/kra.service.js");
const kpiApproval = require("./kpiApproval/kpiApproval.service.js");
const masterKra = require("./masterKra/masterKra.service.js");
const competencies = require("./competencies/competencies.service.js");
const masterCompetencies = require("./masterCompetencies/masterCompetencies.service.js");
const personalDevelopment = require("./personalDevelopment/personalDevelopment.service.js");
const totalScore = require("./totalScore/totalScore.service.js");
const calibration = require("./calibration/calibration.service.js");
const accessControl = require("./accessControl/accessControl.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(employeeAppraisal);
  app.configure(employeeAppraisalRemarks);
  app.configure(employeeAppraisalReview);
  app.configure(employeeCompetenciesscore);
  app.configure(employeeKPIRateRange);
  app.configure(employeeKRAScore);
  app.configure(employeeTraining);
  app.configure(parSession);
  app.configure(rateReview);
  app.configure(kra);
  app.configure(kpiApproval);
  app.configure(masterKra);
  app.configure(competencies);
  app.configure(masterCompetencies);
  app.configure(personalDevelopment);
  app.configure(totalScore);
  app.configure(calibration);
  app.configure(accessControl);
    // ~cb-add-configure-service-name~
};
