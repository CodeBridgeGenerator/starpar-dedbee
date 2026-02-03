
    module.exports = function (app) {
        const modelName = "competencies_scores";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parAppraisersId: { type: Schema.Types.ObjectId, ref: "par_session_appraisers", comment: "ParAppraisersId, dropdown, false, true, true, true, true, true, true, parSessionAppraisers, par_session_appraisers, one-to-one, appraiserEmpNo," },
competency: { type: Schema.Types.ObjectId, ref: "master_competencies", comment: "competency, dropdown, false, true, true, true, true, true, true, masterCompetencies, master_competencies, one-to-one, name," },
rate: { type: Number, max: 10000000, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type: Number, max: 10000000, comment: "WeightedRate, p_number, false, true, true, true, true, true, true, , , , ," },
remarks: { type:  String , comment: "Remarks, p, false, true, true, true, true, true, true, , , , ," },
appraisalId: { type: Schema.Types.ObjectId, ref: "appraisals", comment: "AppraisalId, dropdown, false, true, true, true, true, true, true, appraisals, appraisals, one-to-one, employeeNo," },

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