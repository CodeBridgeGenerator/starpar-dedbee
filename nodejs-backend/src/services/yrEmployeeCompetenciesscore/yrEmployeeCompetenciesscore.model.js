
    module.exports = function (app) {
        const modelName = "yrEmployeeCompetenciesscore";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
competency: { type:  String , minLength: 1, maxLength: 50, trim: true, comment: " Competency, p_inputtext, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Description, p_textarea, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 1000000000000000000, comment: " Weight, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 9999999999, comment: " Rate, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 1000000000000000000, comment: " Weighted Rate, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
remarks: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Remarks, p_textarea, false, true, true, true, true, true, true, , , , ," },

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