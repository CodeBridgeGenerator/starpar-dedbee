const assert = require("assert");
const app = require("../../src/app");

describe("totalScore service", () => {
  let thisService;
  let totalScoreCreated;

  beforeEach(async () => {
    thisService = await app.service("totalScore");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (totalScore)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"description":"new value","rate":23,"weight":23,"weightedRate":23};

    beforeEach(async () => {
      totalScoreCreated = await thisService.create(options);
    });

    it("should create a new totalScore", () => {
      assert.strictEqual(totalScoreCreated.parId, options.parId);
assert.strictEqual(totalScoreCreated.appraisorId, options.appraisorId);
assert.strictEqual(totalScoreCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(totalScoreCreated.description, options.description);
assert.strictEqual(totalScoreCreated.rate, options.rate);
assert.strictEqual(totalScoreCreated.weight, options.weight);
assert.strictEqual(totalScoreCreated.weightedRate, options.weightedRate);
    });
  });

  describe("#get", () => {
    it("should retrieve a totalScore by ID", async () => {
      const retrieved = await thisService.get(totalScoreCreated._id);
      assert.strictEqual(retrieved._id, totalScoreCreated._id);
    });
  });

  describe("#update", () => {
    let totalScoreUpdated;
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"description":"updated value","rate":100,"weight":100,"weightedRate":100};

    beforeEach(async () => {
      totalScoreUpdated = await thisService.update(totalScoreCreated._id, options);
    });

    it("should update an existing totalScore ", async () => {
      assert.strictEqual(totalScoreUpdated.parId, options.parId);
assert.strictEqual(totalScoreUpdated.appraisorId, options.appraisorId);
assert.strictEqual(totalScoreUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(totalScoreUpdated.description, options.description);
assert.strictEqual(totalScoreUpdated.rate, options.rate);
assert.strictEqual(totalScoreUpdated.weight, options.weight);
assert.strictEqual(totalScoreUpdated.weightedRate, options.weightedRate);
    });
  });

  describe("#delete", () => {
  let totalScoreDeleted;
    beforeEach(async () => {
      totalScoreDeleted = await thisService.remove(totalScoreCreated._id);
    });

    it("should delete a totalScore", async () => {
      assert.strictEqual(totalScoreDeleted._id, totalScoreCreated._id);
    });
  });
});