
    module.exports = function (app) {
        const modelName = "rate_review";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parId: { type: Number, max: 99999999, comment: "PARId, p_number, false, true, true, true, true, true, true, , , , ," },
appraisorId: { type: Number, max: 99999999, comment: "AppraisorId, p_number, false, true, true, true, true, true, true, , , , ," },
appraiseeId: { type: Number, max: 99999999, comment: "AppraiseeId, p_number, false, true, true, true, true, true, true, , , , ," },
kpiScore: { type: Number, max: 99999999, comment: "KPI Score, p_number, false, true, true, true, true, true, true, , , , ," },
competency: { type: Number, max: 99999999, comment: "Competency, p_number, false, true, true, true, true, true, true, , , , ," },
totalScore: { type: Number, max: 99999999, comment: "Total Score, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

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