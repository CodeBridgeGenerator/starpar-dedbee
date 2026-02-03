
    module.exports = function (app) {
        const modelName = "score_config";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parSessionId: { type: Schema.Types.ObjectId, ref: "par_session", comment: "ParSessionId, dropdown, false, true, true, true, true, true, true, parSession, par_session, one-to-one, name," },
empGradeCode: { type:  String , comment: "EmpGradeCode, p, false, true, true, true, true, true, true, , , , ," },
kpiWeight: { type:  String , comment: "KpiWeight, p, false, true, true, true, true, true, true, , , , ," },
competencyWeight: { type:  String , comment: "CompetencyWeight, p, false, true, true, true, true, true, true, , , , ," },
demeritWeight: { type:  String , comment: "DemeritWeight, p, false, true, true, true, true, true, true, , , , ," },
meritPointRule: { type: Schema.Types.Mixed , comment: "MeritPointRule, p, false, true, true, true, true, true, true, , , , ," },
ratingScaleMax: { type:  String , comment: "RatingScaleMax, p, false, true, true, true, true, true, true, , , , ," },

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