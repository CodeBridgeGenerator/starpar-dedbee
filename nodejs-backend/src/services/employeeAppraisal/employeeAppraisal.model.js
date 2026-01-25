
    module.exports = function (app) {
        const modelName = "employee_appraisal";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal I D, p_inputnumber, false, false, false, false, false, false, false, , , , ," },
employeeNo: { type:  String , required: true, minLength: 1, maxLength: 10, trim: true, comment: " Employee_ No, p_inputtext, false, true, true, true, true, true, true, , , , ," },
staffName: { type:  String , minLength: 1, maxLength: 100, trim: true, comment: " Staff Name, p_inputtext, false, true, true, true, true, true, true, , , , ," },
fYear: { type: Number, required: true, max: 9999999999, comment: " F Year, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, required: true, comment: " Start Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
endDate: { type: Date, required: true, comment: " End Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
kRAScore: { type: Number, max: 1000000000000000000, comment: " K R A Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
weightedKRAScore: { type: Number, max: 1000000000000000000, comment: " Weighted K R A Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
competencyScore: { type: Number, max: 1000000000000000000, comment: " Competency Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
weightedCompetencyScore: { type: Number, max: 1000000000000000000, comment: " Weighted Competency Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
demeritScore: { type: Number, max: 1000000000000000000, comment: " Demerit Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
totalScore: { type: Number, max: 1000000000000000000, comment: " Total Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
finalScore: { type: Number, max: 1000000000000000000, comment: " Final Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
empComment: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Emp_ Comment, p_textarea, false, true, true, true, true, true, true, , , , ," },
mngComment: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Mng_ Comment, p_textarea, false, true, true, true, true, true, true, , , , ," },
mngSuperiorComment: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Mng Superior_ Comment, p_textarea, false, true, true, true, true, true, true, , , , ," },
managerEmpNO: { type:  String , minLength: 1, maxLength: 10, trim: true, comment: " Manager Emp N O, p_inputtext, false, true, true, true, true, true, true, , , , ," },
managerName: { type:  String , minLength: 1, maxLength: 100, trim: true, comment: " Manager Name, p_inputtext, false, true, true, true, true, true, true, , , , ," },
kRAWeight: { type: Number, max: 9999999999, comment: " K R A Weight, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
competencyWeight: { type: Number, max: 9999999999, comment: " Competency Weight, p_inputnumber, false, true, true, true, true, true, true, , , , ," },

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