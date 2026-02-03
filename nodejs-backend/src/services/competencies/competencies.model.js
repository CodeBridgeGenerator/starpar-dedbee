
    module.exports = function (app) {
        const modelName = "competencies";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parId: { type: Number, max: 99999999, comment: "PARId, p_number, false, true, true, true, true, true, true, , , , ," },
appraisorId: { type: Number, max: 99999999, comment: "AppraisorId, p_number, false, true, true, true, true, true, true, , , , ," },
appraiseeId: { type: Number, max: 99999999, comment: "AppraiseeId, p_number, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 99999999, comment: "Weight, p_number, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 99999999, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedScore: { type: Number, max: 99999999, comment: "Weighted Score, p_number, false, true, true, true, true, true, true, , , , ," },

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