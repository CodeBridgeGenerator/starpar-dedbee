
    module.exports = function (app) {
        const modelName = "calibration";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
low: { type:  String , minLength: 1, maxLength: 999, index: true, trim: true, comment: "low, p, false, true, true, true, true, true, true, , , , ," },
high: { type: Number, max: 99999999, comment: "high, p_number, false, true, true, true, true, true, true, , , , ," },

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