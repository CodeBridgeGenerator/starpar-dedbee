
    module.exports = function (app) {
        const modelName = "kpi_approval";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parId: { type: Number, max: 99999999, comment: "PARId, p_number, false, true, true, true, true, true, true, , , , ," },
appraisorId: { type: Number, max: 99999999, comment: "AppraisorId, p_number, false, true, true, true, true, true, true, , , , ," },
appraiseeId: { type: Number, max: 99999999, comment: "AppraiseeId, p_number, false, true, true, true, true, true, true, , , , ," },
kpi: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "KPI, p, false, true, true, true, true, true, true, , , , ," },
approved: { type: Boolean, required: false, comment: "Approved, p_boolean, false, true, true, true, true, true, true, , , , ," },
approvedDate: { type: Number, max: 99999999, comment: "Approved Date, p_number, false, true, true, true, true, true, true, , , , ," },
kpiSetDate: { type: Number, max: 99999999, comment: "KPI Set Date, p_number, false, true, true, true, true, true, true, , , , ," },

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