const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeAppraisalReview service", () => {
  let thisService;
  let yrEmployeeAppraisalReviewCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeAppraisalReview");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeAppraisalReview)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"strength":"new value","achievement":"new value","targetToAchieve":"new value","otherTraining":"new value"};

    beforeEach(async () => {
      yrEmployeeAppraisalReviewCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeAppraisalReview", () => {
      assert.strictEqual(yrEmployeeAppraisalReviewCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalReviewCreated.strength, options.strength);
assert.strictEqual(yrEmployeeAppraisalReviewCreated.achievement, options.achievement);
assert.strictEqual(yrEmployeeAppraisalReviewCreated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(yrEmployeeAppraisalReviewCreated.otherTraining, options.otherTraining);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeAppraisalReview by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeAppraisalReviewCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeAppraisalReviewCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeAppraisalReviewUpdated;
    const options = {"appraisalID":100,"strength":"updated value","achievement":"updated value","targetToAchieve":"updated value","otherTraining":"updated value"};

    beforeEach(async () => {
      yrEmployeeAppraisalReviewUpdated = await thisService.update(yrEmployeeAppraisalReviewCreated._id, options);
    });

    it("should update an existing yrEmployeeAppraisalReview ", async () => {
      assert.strictEqual(yrEmployeeAppraisalReviewUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalReviewUpdated.strength, options.strength);
assert.strictEqual(yrEmployeeAppraisalReviewUpdated.achievement, options.achievement);
assert.strictEqual(yrEmployeeAppraisalReviewUpdated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(yrEmployeeAppraisalReviewUpdated.otherTraining, options.otherTraining);
    });
  });

  describe("#delete", () => {
  let yrEmployeeAppraisalReviewDeleted;
    beforeEach(async () => {
      yrEmployeeAppraisalReviewDeleted = await thisService.remove(yrEmployeeAppraisalReviewCreated._id);
    });

    it("should delete a yrEmployeeAppraisalReview", async () => {
      assert.strictEqual(yrEmployeeAppraisalReviewDeleted._id, yrEmployeeAppraisalReviewCreated._id);
    });
  });
});