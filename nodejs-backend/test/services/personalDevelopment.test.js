const assert = require("assert");
const app = require("../../src/app");

describe("personalDevelopment service", () => {
  let thisService;
  let personalDevelopmentCreated;

  beforeEach(async () => {
    thisService = await app.service("personalDevelopment");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (personalDevelopment)");
  });

  describe("#create", () => {
    const options = {"appraiseeId":23,"strengthsAndAreasOfConcernIdentified":"new value","specialAchievementsForThePeriodUnderReview":"new value"};

    beforeEach(async () => {
      personalDevelopmentCreated = await thisService.create(options);
    });

    it("should create a new personalDevelopment", () => {
      assert.strictEqual(personalDevelopmentCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(personalDevelopmentCreated.strengthsAndAreasOfConcernIdentified, options.strengthsAndAreasOfConcernIdentified);
assert.strictEqual(personalDevelopmentCreated.specialAchievementsForThePeriodUnderReview, options.specialAchievementsForThePeriodUnderReview);
    });
  });

  describe("#get", () => {
    it("should retrieve a personalDevelopment by ID", async () => {
      const retrieved = await thisService.get(personalDevelopmentCreated._id);
      assert.strictEqual(retrieved._id, personalDevelopmentCreated._id);
    });
  });

  describe("#update", () => {
    let personalDevelopmentUpdated;
    const options = {"appraiseeId":100,"strengthsAndAreasOfConcernIdentified":"updated value","specialAchievementsForThePeriodUnderReview":"updated value"};

    beforeEach(async () => {
      personalDevelopmentUpdated = await thisService.update(personalDevelopmentCreated._id, options);
    });

    it("should update an existing personalDevelopment ", async () => {
      assert.strictEqual(personalDevelopmentUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(personalDevelopmentUpdated.strengthsAndAreasOfConcernIdentified, options.strengthsAndAreasOfConcernIdentified);
assert.strictEqual(personalDevelopmentUpdated.specialAchievementsForThePeriodUnderReview, options.specialAchievementsForThePeriodUnderReview);
    });
  });

  describe("#delete", () => {
  let personalDevelopmentDeleted;
    beforeEach(async () => {
      personalDevelopmentDeleted = await thisService.remove(personalDevelopmentCreated._id);
    });

    it("should delete a personalDevelopment", async () => {
      assert.strictEqual(personalDevelopmentDeleted._id, personalDevelopmentCreated._id);
    });
  });
});