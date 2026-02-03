
    module.exports = function (app) {
        const modelName = "master_kra";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            departmentId: { type: Schema.Types.ObjectId, ref: "departments", comment: "DepartmentId, dropdown, false, true, true, true, true, true, true, departments, departments, one-to-one, name," },
parSessionId: { type: Schema.Types.ObjectId, ref: "par_session", comment: "ParSessionId, dropdown, false, true, true, true, true, true, true, parSession, par_session, one-to-one, name," },
balancedScorecard: { type: Schema.Types.ObjectId, ref: "master_bsc", comment: "Balanced Scorecard, dropdown, false, true, true, true, true, true, true, masterBsc, master_bsc, one-to-one, name," },
kpi: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "KPI, p, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 99999999, comment: "WEIGHT (%), p_number, false, true, true, true, true, true, true, , , , ," },
target: { type: Number, max: 99999999, comment: "Target, p_number, false, true, true, true, true, true, true, , , , ," },
actualAchievement: { type: Number, max: 99999999, comment: "Actual Achievement, p_number, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 99999999, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 99999999, comment: "Weighted Rate, p_number, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
sectionId: { type: Schema.Types.ObjectId, ref: "sections", comment: "SectionId, dropdown, false, true, true, true, true, true, true, sections, sections, one-to-one, name," },

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