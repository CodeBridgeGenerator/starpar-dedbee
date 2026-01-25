const assert = require("assert");
const app = require("../../src/app");

describe("employeeAppraisalReview service", () => {
  let thisService;
  let employeeAppraisalReviewCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeAppraisalReview");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeAppraisalReview)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"strength":"new value","achievement":"new value","targetToAchieve":"new value","otherTraining":"new value"};

    beforeEach(async () => {
      employeeAppraisalReviewCreated = await thisService.create(options);
    });

    it("should create a new employeeAppraisalReview", () => {
      assert.strictEqual(employeeAppraisalReviewCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalReviewCreated.strength, options.strength);
assert.strictEqual(employeeAppraisalReviewCreated.achievement, options.achievement);
assert.strictEqual(employeeAppraisalReviewCreated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(employeeAppraisalReviewCreated.otherTraining, options.otherTraining);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeAppraisalReview by ID", async () => {
      const retrieved = await thisService.get(employeeAppraisalReviewCreated._id);
      assert.strictEqual(retrieved._id, employeeAppraisalReviewCreated._id);
    });
  });

  describe("#update", () => {
    let employeeAppraisalReviewUpdated;
    const options = {"appraisalID":100,"strength":"updated value","achievement":"updated value","targetToAchieve":"updated value","otherTraining":"updated value"};

    beforeEach(async () => {
      employeeAppraisalReviewUpdated = await thisService.update(employeeAppraisalReviewCreated._id, options);
    });

    it("should update an existing employeeAppraisalReview ", async () => {
      assert.strictEqual(employeeAppraisalReviewUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalReviewUpdated.strength, options.strength);
assert.strictEqual(employeeAppraisalReviewUpdated.achievement, options.achievement);
assert.strictEqual(employeeAppraisalReviewUpdated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(employeeAppraisalReviewUpdated.otherTraining, options.otherTraining);
    });
  });

  describe("#delete", () => {
  let employeeAppraisalReviewDeleted;
    beforeEach(async () => {
      employeeAppraisalReviewDeleted = await thisService.remove(employeeAppraisalReviewCreated._id);
    });

    it("should delete a employeeAppraisalReview", async () => {
      assert.strictEqual(employeeAppraisalReviewDeleted._id, employeeAppraisalReviewCreated._id);
    });
  });
});