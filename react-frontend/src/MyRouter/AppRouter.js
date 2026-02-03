import React from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

import SingleEmployeeAppraisalPage from "../components/app_components/EmployeeAppraisalPage/SingleEmployeeAppraisalPage";
import EmployeeAppraisalProjectLayoutPage from "../components/app_components/EmployeeAppraisalPage/EmployeeAppraisalProjectLayoutPage";
import SingleEmployeeAppraisalRemarksPage from "../components/app_components/EmployeeAppraisalRemarksPage/SingleEmployeeAppraisalRemarksPage";
import EmployeeAppraisalRemarkProjectLayoutPage from "../components/app_components/EmployeeAppraisalRemarksPage/EmployeeAppraisalRemarkProjectLayoutPage";
import SingleEmployeeAppraisalReviewPage from "../components/app_components/EmployeeAppraisalReviewPage/SingleEmployeeAppraisalReviewPage";
import EmployeeAppraisalReviewProjectLayoutPage from "../components/app_components/EmployeeAppraisalReviewPage/EmployeeAppraisalReviewProjectLayoutPage";
import SingleEmployeeCompetenciesscorePage from "../components/app_components/EmployeeCompetenciesscorePage/SingleEmployeeCompetenciesscorePage";
import EmployeeCompetenciesscoreProjectLayoutPage from "../components/app_components/EmployeeCompetenciesscorePage/EmployeeCompetenciesscoreProjectLayoutPage";
import SingleEmployeeKPIRateRangePage from "../components/app_components/EmployeeKPIRateRangePage/SingleEmployeeKPIRateRangePage";
import EmployeeKPIRateRangeProjectLayoutPage from "../components/app_components/EmployeeKPIRateRangePage/EmployeeKPIRateRangeProjectLayoutPage";
import SingleEmployeeKRAScorePage from "../components/app_components/EmployeeKRAScorePage/SingleEmployeeKRAScorePage";
import EmployeeKRAScoreProjectLayoutPage from "../components/app_components/EmployeeKRAScorePage/EmployeeKRAScoreProjectLayoutPage";
import SingleEmployeeTrainingPage from "../components/app_components/EmployeeTrainingPage/SingleEmployeeTrainingPage";
import EmployeeTrainingProjectLayoutPage from "../components/app_components/EmployeeTrainingPage/EmployeeTrainingProjectLayoutPage";
import SingleParSessionPage from "../components/app_components/ParSessionPage/SingleParSessionPage";
import ParSessionProjectLayoutPage from "../components/app_components/ParSessionPage/ParSessionProjectLayoutPage";
import SingleRateReviewPage from "../components/app_components/RateReviewPage/SingleRateReviewPage";
import RateReviewProjectLayoutPage from "../components/app_components/RateReviewPage/RateReviewProjectLayoutPage";
import SingleKraPage from "../components/app_components/KraPage/SingleKraPage";
import KraProjectLayoutPage from "../components/app_components/KraPage/KraProjectLayoutPage";
import SingleKpiApprovalPage from "../components/app_components/KpiApprovalPage/SingleKpiApprovalPage";
import KpiApprovalProjectLayoutPage from "../components/app_components/KpiApprovalPage/KpiApprovalProjectLayoutPage";
import SingleMasterKraPage from "../components/app_components/MasterKraPage/SingleMasterKraPage";
import MasterKraProjectLayoutPage from "../components/app_components/MasterKraPage/MasterKraProjectLayoutPage";
import SingleCompetenciesPage from "../components/app_components/CompetenciesPage/SingleCompetenciesPage";
import CompetencyProjectLayoutPage from "../components/app_components/CompetenciesPage/CompetencyProjectLayoutPage";
import SingleMasterCompetenciesPage from "../components/app_components/MasterCompetenciesPage/SingleMasterCompetenciesPage";
import MasterCompetencyProjectLayoutPage from "../components/app_components/MasterCompetenciesPage/MasterCompetencyProjectLayoutPage";
import SinglePersonalDevelopmentPage from "../components/app_components/PersonalDevelopmentPage/SinglePersonalDevelopmentPage";
import PersonalDevelopmentProjectLayoutPage from "../components/app_components/PersonalDevelopmentPage/PersonalDevelopmentProjectLayoutPage";
import SingleTotalScorePage from "../components/app_components/TotalScorePage/SingleTotalScorePage";
import TotalScoreProjectLayoutPage from "../components/app_components/TotalScorePage/TotalScoreProjectLayoutPage";
import SingleCalibrationPage from "../components/app_components/CalibrationPage/SingleCalibrationPage";
import CalibrationProjectLayoutPage from "../components/app_components/CalibrationPage/CalibrationProjectLayoutPage";
import SingleAccessControlPage from "../components/app_components/AccessControlPage/SingleAccessControlPage";
import AccessControlProjectLayoutPage from "../components/app_components/AccessControlPage/AccessControlProjectLayoutPage";
import SingleParSessionAppraisersPage from "../components/app_components/ParSessionAppraisersPage/SingleParSessionAppraisersPage";
import ParSessionAppraiserProjectLayoutPage from "../components/app_components/ParSessionAppraisersPage/ParSessionAppraiserProjectLayoutPage";
import SingleMasterBscPage from "../components/app_components/MasterBscPage/SingleMasterBscPage";
import MasterBscProjectLayoutPage from "../components/app_components/MasterBscPage/MasterBscProjectLayoutPage";
import SingleMasterTrainingPage from "../components/app_components/MasterTrainingPage/SingleMasterTrainingPage";
import MasterTrainingProjectLayoutPage from "../components/app_components/MasterTrainingPage/MasterTrainingProjectLayoutPage";
import SingleScoreConfigPage from "../components/app_components/ScoreConfigPage/SingleScoreConfigPage";
import ScoreConfigProjectLayoutPage from "../components/app_components/ScoreConfigPage/ScoreConfigProjectLayoutPage";
import SingleMasterKpiPage from "../components/app_components/MasterKpiPage/SingleMasterKpiPage";
import MasterKpiProjectLayoutPage from "../components/app_components/MasterKpiPage/MasterKpiProjectLayoutPage";
import SingleAppraisalsPage from "../components/app_components/AppraisalsPage/SingleAppraisalsPage";
import AppraisalProjectLayoutPage from "../components/app_components/AppraisalsPage/AppraisalProjectLayoutPage";
import SingleCompetenciesScoresPage from "../components/app_components/CompetenciesScoresPage/SingleCompetenciesScoresPage";
import CompetenciesScoreProjectLayoutPage from "../components/app_components/CompetenciesScoresPage/CompetenciesScoreProjectLayoutPage";
import SingleKraScoresPage from "../components/app_components/KraScoresPage/SingleKraScoresPage";
import KraScoreProjectLayoutPage from "../components/app_components/KraScoresPage/KraScoreProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
  return (
    <Routes>
      {/* ~cb-add-unprotected-route~ */}
      <Route element={<ProtectedRoute redirectPath={"/login"} />}>
        
<Route path="/employeeAppraisalLayout/employeeAppraisal" exact element={<EmployeeAppraisalProjectLayoutPage />} />
<Route path="/employeeAppraisal/:singleEmployeeAppraisalId" exact element={<SingleEmployeeAppraisalPage />} />
<Route path="/employeeAppraisal" exact element={<EmployeeAppraisalProjectLayoutPage />} />
<Route path="/employeeAppraisalRemarksLayout/employeeAppraisalRemarks" exact element={<EmployeeAppraisalRemarkProjectLayoutPage />} />
<Route path="/employeeAppraisalRemarks/:singleEmployeeAppraisalRemarksId" exact element={<SingleEmployeeAppraisalRemarksPage />} />
<Route path="/employeeAppraisalRemarks" exact element={<EmployeeAppraisalRemarkProjectLayoutPage />} />
<Route path="/employeeAppraisalReviewLayout/employeeAppraisalReview" exact element={<EmployeeAppraisalReviewProjectLayoutPage />} />
<Route path="/employeeAppraisalReview/:singleEmployeeAppraisalReviewId" exact element={<SingleEmployeeAppraisalReviewPage />} />
<Route path="/employeeAppraisalReview" exact element={<EmployeeAppraisalReviewProjectLayoutPage />} />
<Route path="/employeeCompetenciesscoreLayout/employeeCompetenciesscore" exact element={<EmployeeCompetenciesscoreProjectLayoutPage />} />
<Route path="/employeeCompetenciesscore/:singleEmployeeCompetenciesscoreId" exact element={<SingleEmployeeCompetenciesscorePage />} />
<Route path="/employeeCompetenciesscore" exact element={<EmployeeCompetenciesscoreProjectLayoutPage />} />
<Route path="/employeeKPIRateRangeLayout/employeeKPIRateRange" exact element={<EmployeeKPIRateRangeProjectLayoutPage />} />
<Route path="/employeeKPIRateRange/:singleEmployeeKPIRateRangeId" exact element={<SingleEmployeeKPIRateRangePage />} />
<Route path="/employeeKPIRateRange" exact element={<EmployeeKPIRateRangeProjectLayoutPage />} />
<Route path="/employeeKRAScoreLayout/employeeKRAScore" exact element={<EmployeeKRAScoreProjectLayoutPage />} />
<Route path="/employeeKRAScore/:singleEmployeeKRAScoreId" exact element={<SingleEmployeeKRAScorePage />} />
<Route path="/employeeKRAScore" exact element={<EmployeeKRAScoreProjectLayoutPage />} />
<Route path="/employeeTrainingLayout/employeeTraining" exact element={<EmployeeTrainingProjectLayoutPage />} />
<Route path="/employeeTraining/:singleEmployeeTrainingId" exact element={<SingleEmployeeTrainingPage />} />
<Route path="/employeeTraining" exact element={<EmployeeTrainingProjectLayoutPage />} />
<Route path="/parSession/:singleParSessionId" exact element={<SingleParSessionPage />} />
<Route path="/parSession" exact element={<ParSessionProjectLayoutPage />} />
<Route path="/rateReview/:singleRateReviewId" exact element={<SingleRateReviewPage />} />
<Route path="/rateReview" exact element={<RateReviewProjectLayoutPage />} />
<Route path="/kra/:singleKraId" exact element={<SingleKraPage />} />
<Route path="/kra" exact element={<KraProjectLayoutPage />} />
<Route path="/kpiApproval/:singleKpiApprovalId" exact element={<SingleKpiApprovalPage />} />
<Route path="/kpiApproval" exact element={<KpiApprovalProjectLayoutPage />} />
<Route path="/masterKra/:singleMasterKraId" exact element={<SingleMasterKraPage />} />
<Route path="/masterKra" exact element={<MasterKraProjectLayoutPage />} />
<Route path="/competencies/:singleCompetenciesId" exact element={<SingleCompetenciesPage />} />
<Route path="/competencies" exact element={<CompetencyProjectLayoutPage />} />
<Route path="/masterCompetencies/:singleMasterCompetenciesId" exact element={<SingleMasterCompetenciesPage />} />
<Route path="/masterCompetencies" exact element={<MasterCompetencyProjectLayoutPage />} />
<Route path="/personalDevelopment/:singlePersonalDevelopmentId" exact element={<SinglePersonalDevelopmentPage />} />
<Route path="/personalDevelopment" exact element={<PersonalDevelopmentProjectLayoutPage />} />
<Route path="/totalScore/:singleTotalScoreId" exact element={<SingleTotalScorePage />} />
<Route path="/totalScore" exact element={<TotalScoreProjectLayoutPage />} />
<Route path="/calibration/:singleCalibrationId" exact element={<SingleCalibrationPage />} />
<Route path="/calibration" exact element={<CalibrationProjectLayoutPage />} />
<Route path="/accessControl/:singleAccessControlId" exact element={<SingleAccessControlPage />} />
<Route path="/accessControl" exact element={<AccessControlProjectLayoutPage />} />
<Route path="/parSessionAppraisers/:singleParSessionAppraisersId" exact element={<SingleParSessionAppraisersPage />} />
<Route path="/parSessionAppraisers" exact element={<ParSessionAppraiserProjectLayoutPage />} />
<Route path="/masterBsc/:singleMasterBscId" exact element={<SingleMasterBscPage />} />
<Route path="/masterBsc" exact element={<MasterBscProjectLayoutPage />} />
<Route path="/masterTraining/:singleMasterTrainingId" exact element={<SingleMasterTrainingPage />} />
<Route path="/masterTraining" exact element={<MasterTrainingProjectLayoutPage />} />
<Route path="/scoreConfig/:singleScoreConfigId" exact element={<SingleScoreConfigPage />} />
<Route path="/scoreConfig" exact element={<ScoreConfigProjectLayoutPage />} />
<Route path="/masterKpi/:singleMasterKpiId" exact element={<SingleMasterKpiPage />} />
<Route path="/masterKpi" exact element={<MasterKpiProjectLayoutPage />} />
<Route path="/appraisals/:singleAppraisalsId" exact element={<SingleAppraisalsPage />} />
<Route path="/appraisals" exact element={<AppraisalProjectLayoutPage />} />
<Route path="/competenciesScores/:singleCompetenciesScoresId" exact element={<SingleCompetenciesScoresPage />} />
<Route path="/competenciesScores" exact element={<CompetenciesScoreProjectLayoutPage />} />
<Route path="/kraScores/:singleKraScoresId" exact element={<SingleKraScoresPage />} />
<Route path="/kraScores" exact element={<KraScoreProjectLayoutPage />} />
        {/* ~cb-add-protected-route~ */}
      </Route>
    </Routes>
  );
};

const mapState = (state) => {
  const { isLoggedIn } = state.auth;
  return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(AppRouter);
