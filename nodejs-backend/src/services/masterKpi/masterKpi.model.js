
    module.exports = function (app) {
        const modelName = "master_kpi";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            kra: { type: Schema.Types.ObjectId, ref: "master_kra", comment: "KRA, dropdown, false, true, true, true, true, true, true, masterKra, master_kra, one-to-one, name," },
name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
weight: { type: Number, max: 10000000, comment: "Weight, p_number, false, true, true, true, true, true, true, , , , ," },
target: { type: Number, max: 10000000, comment: "Target, p_number, false, true, true, true, true, true, true, , , , ," },
actualAchievement: { type: Number, max: 10000000, comment: "ActualAchievement, p_number, false, true, true, true, true, true, true, , , , ," },
rate: { type: Number, max: 10000000, comment: "Rate, p_number, false, true, true, true, true, true, true, , , , ," },
weightedRate: { type:  String , comment: "WeightedRate, p, false, true, true, true, true, true, true, , , , ," },
startValue: { type: Number, max: 10000000, comment: "StartValue, p_number, false, true, true, true, true, true, true, , , , ," },
endValue: { type:  String , comment: "EndValue, p, false, true, true, true, true, true, true, , , , ," },
importanceRelevance: { type:  String , comment: "ImportanceRelevance, p, false, true, true, true, true, true, true, , , , ," },
sortOrder: { type:  String , comment: "SortOrder, p, false, true, true, true, true, true, true, , , , ," },
unitMeasurement: { type:  String , comment: "UnitMeasurement, p, false, true, true, true, true, true, true, , , , ," },

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