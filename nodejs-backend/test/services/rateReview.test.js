const assert = require("assert");
const app = require("../../src/app");

describe("rateReview service", () => {
  let thisService;
  let rateReviewCreated;

  beforeEach(async () => {
    thisService = await app.service("rateReview");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (rateReview)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"kpiScore":23,"competency":23,"totalScore":23,"status":"new value"};

    beforeEach(async () => {
      rateReviewCreated = await thisService.create(options);
    });

    it("should create a new rateReview", () => {
      assert.strictEqual(rateReviewCreated.parId, options.parId);
assert.strictEqual(rateReviewCreated.appraisorId, options.appraisorId);
assert.strictEqual(rateReviewCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(rateReviewCreated.kpiScore, options.kpiScore);
assert.strictEqual(rateReviewCreated.competency, options.competency);
assert.strictEqual(rateReviewCreated.totalScore, options.totalScore);
assert.strictEqual(rateReviewCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a rateReview by ID", async () => {
      const retrieved = await thisService.get(rateReviewCreated._id);
      assert.strictEqual(retrieved._id, rateReviewCreated._id);
    });
  });

  describe("#update", () => {
    let rateReviewUpdated;
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"kpiScore":100,"competency":100,"totalScore":100,"status":"updated value"};

    beforeEach(async () => {
      rateReviewUpdated = await thisService.update(rateReviewCreated._id, options);
    });

    it("should update an existing rateReview ", async () => {
      assert.strictEqual(rateReviewUpdated.parId, options.parId);
assert.strictEqual(rateReviewUpdated.appraisorId, options.appraisorId);
assert.strictEqual(rateReviewUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(rateReviewUpdated.kpiScore, options.kpiScore);
assert.strictEqual(rateReviewUpdated.competency, options.competency);
assert.strictEqual(rateReviewUpdated.totalScore, options.totalScore);
assert.strictEqual(rateReviewUpdated.status, options.status);
    });
  });

  describe("#delete", () => {
  let rateReviewDeleted;
    beforeEach(async () => {
      rateReviewDeleted = await thisService.remove(rateReviewCreated._id);
    });

    it("should delete a rateReview", async () => {
      assert.strictEqual(rateReviewDeleted._id, rateReviewCreated._id);
    });
  });
});