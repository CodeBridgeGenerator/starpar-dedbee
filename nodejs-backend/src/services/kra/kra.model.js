
    module.exports = function (app) {
        const modelName = "kra";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parId: { type: Number, max: 99999999, comment: "PARId, p_number, false, true, true, true, true, true, true, , , , ," },
appraisorId: { type: Number, max: 99999999, comment: "AppraisorId, p_number, false, true, true, true, true, true, true, , , , ," },
appraiseeId: { type: Number, max: 99999999, comment: "AppraiseeId, p_number, false, true, true, true, true, true, true, , , , ," },
balancedScorecard: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Balanced Scorecard, p, false, true, true, true, true, true, true, , , , ," },
kpi: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "KPI, p, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 99999999, comment: "WEIGHT (%), p_number, false, true, true, true, true, true, true, , , , ," },
target: { type: Number, max: 99999999, comment: "Target, p_number, false, true, true, true, true, true, true, , , , ," },
actualAchievement: { type: Number, max: 99999999, comment: "Actual Achievement, p_number, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 99999999, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 99999999, comment: "Weighted Rate, p_number, false, true, true, true, true, true, true, , , , ," },

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