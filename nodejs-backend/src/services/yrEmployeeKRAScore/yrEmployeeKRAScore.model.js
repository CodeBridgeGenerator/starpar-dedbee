
    module.exports = function (app) {
        const modelName = "yrEmployeeKRAScore";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
secKPIID: { type: Number, required: true, max: 1000000000000000000, comment: " Sec K P I_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 1000000000000000000, comment: "Weight, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
score: { type: Number, max: 1000000000000000000, comment: " Score, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 9999999999, comment: " Rate, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 1000000000000000000, comment: "Weighted Rate, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
target: { type: Number, max: 1000000000000000000, comment: " Target, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
kRA: { type:  String , minLength: 1, maxLength: 50, trim: true, comment: " K R A, p_inputtext, false, true, true, true, true, true, true, , , , ," },
kPIGoal: { type:  String , minLength: 1, maxLength: 255, trim: true, comment: " K P I Goal, p_inputtext, false, true, true, true, true, true, true, , , , ," },
unitMeasurement: { type:  String , minLength: 1, maxLength: 15, trim: true, comment: " Unit Measurement, p_inputtext, false, true, true, true, true, true, true, , , , ," },
sortOrder: { type: Number, max: 9999999999, comment: " Sort Order, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
balancedScoreCard: { type:  String , minLength: 1, maxLength: 60, trim: true, comment: " Balanced Score Card, p_inputtext, false, true, true, true, true, true, true, , , , ," },
importanceRelevance: { type:  String , minLength: 1, maxLength: 30, trim: true, comment: " Importance Relevance, p_inputtext, false, true, true, true, true, true, true, , , , ," },

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