
    module.exports = function (app) {
        const modelName = "kra_scores";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parAppraisersId: { type: Schema.Types.ObjectId, ref: "par_session_appraisers", comment: "ParAppraisersId, dropdown, false, true, true, true, true, true, true, parSessionAppraisers, par_session_appraisers, one-to-one, appraiserEmpNo," },
kpi: { type: Schema.Types.ObjectId, ref: "master_kpi", comment: "KPI, dropdown, false, true, true, true, true, true, true, masterKpi, master_kpi, one-to-one, name," },
actualAchievement: { type: Number, max: 10000000, comment: "ActualAchievement, p_number, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 10000000, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 10000000, comment: "WeightedRate, p_number, false, true, true, true, true, true, true, , , , ," },
score: { type: Number, max: 10000000, comment: "score, p_number, false, true, true, true, true, true, true, , , , ," },
appraisalId: { type: Schema.Types.ObjectId, ref: "appraisals", comment: "AppraisalId, dropdown, false, true, true, true, true, true, true, appraisals, appraisals, one-to-one, employeeNo," },

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