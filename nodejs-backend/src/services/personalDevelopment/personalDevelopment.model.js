
    module.exports = function (app) {
        const modelName = "personal_development";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            appraiseeId: { type: Number, max: 10000000, comment: "AppraiseeId, p_number, false, true, true, true, true, true, true, , , , ," },
strengthsAndAreasOfConcernIdentified: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Strengths and Areas of Concern Identified, p, false, true, true, true, true, true, true, , , , ," },
specialAchievementsForThePeriodUnderReview: { type:  String , minLength: 2, maxLength: 999, index: true, trim: true, comment: "Special Achievements for the Period Under Review, p, false, true, true, true, true, true, true, , , , ," },

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