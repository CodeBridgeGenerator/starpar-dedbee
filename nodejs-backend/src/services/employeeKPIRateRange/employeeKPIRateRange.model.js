
    module.exports = function (app) {
        const modelName = "employee_kpi_rate_range";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraisalID: { type: Number, required: true, max: 1000000000000000000, comment: " Appraisal_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
secKPIID: { type: Number, required: true, max: 1000000000000000000, comment: " Sec K P I_ I D, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, required: true, max: 9999999999, comment: " Rate, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
startValue: { type: Number, max: 1000000000000000000, comment: " Start Value, p_inputnumber, false, true, true, true, true, true, true, , , , ," },
endValue: { type: Number, max: 1000000000000000000, comment: " End Value, p_inputnumber, false, true, true, true, true, true, true, , , , ," },

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