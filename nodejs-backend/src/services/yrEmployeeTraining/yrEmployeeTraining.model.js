
    module.exports = function (app) {
        const modelName = "yrEmployeeTraining";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
trainingName: { type:  String , minLength: 1, maxLength: 50, trim: true, comment: " Training Name, p_inputtext, false, true, true, true, true, true, true, , , , ," },

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