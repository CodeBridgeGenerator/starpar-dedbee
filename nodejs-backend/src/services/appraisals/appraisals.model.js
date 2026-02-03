
    module.exports = function (app) {
        const modelName = "appraisals";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalId: { type: Number, max: 10000000, comment: "AppraisalID, p_number, false, true, true, true, true, true, true, , , , ," },
employeeNo: { type: Schema.Types.ObjectId, ref: "employees", comment: "EmployeeNo, dropdown, false, true, true, true, true, true, true, employees, employees, one-to-one, empNo," },
fYear: { type: Number, max: 10000000, comment: "FYear, p_number, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "StartDate, p_date, false, true, true, true, true, true, true, , , , ," },
endDate: { type: Date, comment: "EndDate, p_date, false, true, true, true, true, true, true, , , , ," },
kraScore: { type: Number, max: 10000000, comment: "KraScore, p_number, false, true, true, true, true, true, true, , , , ," },
weightedKraScore: { type: Number, max: 10000000, comment: "WeightedKRAScore, p_number, false, true, true, true, true, true, true, , , , ," },
competencyScore: { type: Number, max: 10000000, comment: "CompetencyScore, p_number, false, true, true, true, true, true, true, , , , ," },
weightedCompetencyScore: { type:  String , comment: "WeightedCompetencyScore, p, false, true, true, true, true, true, true, , , , ," },
demeritScore: { type: Number, max: 10000000, comment: "DemeritScore, p_number, false, true, true, true, true, true, true, , , , ," },
totalScore: { type: Number, max: 10000000, comment: "TotalScore, p_number, false, true, true, true, true, true, true, , , , ," },
finalScore: { type: Number, max: 10000000, comment: "FinalScore, p_number, false, true, true, true, true, true, true, , , , ," },
empComment: { type:  String , comment: "EmpComment, p, false, true, true, true, true, true, true, , , , ," },
mngComment: { type:  String , comment: "MngComment, p, false, true, true, true, true, true, true, , , , ," },
mngSuperiorComment: { type:  String , comment: "MngSuperiorComment, p, false, true, true, true, true, true, true, , , , ," },
managerEmpNo: { type: Schema.Types.ObjectId, ref: "employees", comment: "ManagerEmpNO, dropdown, false, true, true, true, true, true, true, employees, employees, one-to-one, empNo," },
kraWeight: { type: Number, max: 10000000, comment: "KRAWeight, p_number, false, true, true, true, true, true, true, , , , ," },
competencyWeight: { type: Number, max: 10000000, comment: "competencyWeight, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };