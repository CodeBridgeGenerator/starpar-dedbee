
    module.exports = function (app) {
        const modelName = "par_session_appraisers";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            parSessionId: { type: Schema.Types.ObjectId, ref: "par_session", comment: "ParSessionId, dropdown, false, true, true, true, true, true, true, parSession, par_session, one-to-one, name," },
appraiseeEmpNo: { type: Schema.Types.ObjectId, ref: "employees", comment: "AppraiseeEmpNo, dropdown, false, true, true, true, true, true, true, employees, employees, one-to-one, empNo," },
appraiserEmpNo: { type: [Schema.Types.ObjectId], ref: "employees", description: "isArray", comment: "AppraiserEmpNo, dropdown, false, true, true, true, true, true, true, employees, employees, one-to-one, empNo," },
weightage: { type: Number, max: 10000000, comment: "Weightage, p_number, false, true, true, true, true, true, true, , , , ," },
department: { type: Schema.Types.ObjectId, ref: "departments", comment: "Department, dropdown, false, true, true, true, true, true, true, departments, departments, one-to-one, name," },
section: { type: Schema.Types.ObjectId, ref: "sections", comment: "Section, dropdown, false, true, true, true, true, true, true, sections, sections, one-to-one, name," },
appraiserComment: { type:  String , comment: "AppraiserComment, p, false, true, true, true, true, true, true, , , , ," },
kraScore: { type: Number, max: 10000000, comment: "KRAScore, p_number, false, true, true, true, true, true, true, , , , ," },
weightedKraScore: { type: Number, max: 10000000, comment: "WeightedKRAScore, p_number, false, true, true, true, true, true, true, , , , ," },
competencyScore: { type: Number, max: 10000000, comment: "CompetencyScore, p_number, false, true, true, true, true, true, true, , , , ," },
weightedCompetencyScore: { type: Number, max: 10000000, comment: "WeightedCompetencyScore, p_number, false, true, true, true, true, true, true, , , , ," },

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