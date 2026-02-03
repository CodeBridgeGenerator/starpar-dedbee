const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("personalDevelopment service", () => {
  let thisService;
  let personalDevelopmentCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("personalDevelopment");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (personalDevelopment)");
  });

  describe("#create", () => {
    const options = {"appraiseeId":23,"strengthsAndAreasOfConcernIdentified":"new value","specialAchievementsForThePeriodUnderReview":"new value"};

    beforeEach(async () => {
      personalDevelopmentCreated = await thisService.create({...options, ...users});
    });

    it("should create a new personalDevelopment", () => {
      assert.strictEqual(personalDevelopmentCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(personalDevelopmentCreated.strengthsAndAreasOfConcernIdentified, options.strengthsAndAreasOfConcernIdentified);
assert.strictEqual(personalDevelopmentCreated.specialAchievementsForThePeriodUnderReview, options.specialAchievementsForThePeriodUnderReview);
    });
  });

  describe("#get", () => {
    it("should retrieve a personalDevelopment by ID", async () => {
      const retrieved = await thisService.findById(personalDevelopmentCreated._id);
      assert.strictEqual(retrieved._id.toString(), personalDevelopmentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraiseeId":100,"strengthsAndAreasOfConcernIdentified":"updated value","specialAchievementsForThePeriodUnderReview":"updated value"};

    it("should update an existing personalDevelopment ", async () => {
      const personalDevelopmentUpdated = await thisService.findByIdAndUpdate(
        personalDevelopmentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(personalDevelopmentUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(personalDevelopmentUpdated.strengthsAndAreasOfConcernIdentified, options.strengthsAndAreasOfConcernIdentified);
assert.strictEqual(personalDevelopmentUpdated.specialAchievementsForThePeriodUnderReview, options.specialAchievementsForThePeriodUnderReview);
    });
  });

  describe("#delete", () => {
    it("should delete a personalDevelopment", async () => {
      const personalDevelopmentDeleted = await thisService.remove(personalDevelopmentCreated._id);
      assert.strictEqual(personalDevelopmentDeleted._id.toString(), personalDevelopmentCreated._id.toString());
    });
  });
});