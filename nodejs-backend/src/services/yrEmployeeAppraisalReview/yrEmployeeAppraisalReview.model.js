
    module.exports = function (app) {
        const modelName = "yrEmployeeAppraisalReview";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
strength: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Strength, p_textarea, false, true, true, true, true, true, true, , , , ," },
achievement: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Achievement, p_textarea, false, true, true, true, true, true, true, , , , ," },
targetToAchieve: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Target To Achieve, p_textarea, false, true, true, true, true, true, true, , , , ," },
otherTraining: { type:  String , minLength: 1, maxLength: 2147483647, trim: true, comment: " Other Training, p_textarea, false, true, true, true, true, true, true, , , , ," },

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