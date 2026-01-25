const assert = require("assert");
const app = require("../../src/app");

describe("employeeKRAScore service", () => {
  let thisService;
  let employeeKRAScoreCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeKRAScore");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeKRAScore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"weight":23,"score":23,"rate":23,"weightedRate":23,"target":23,"kRA":"new value","kPIGoal":"new value","unitMeasurement":"new value","sortOrder":23,"balancedScoreCard":"new value","importanceRelevance":"new value"};

    beforeEach(async () => {
      employeeKRAScoreCreated = await thisService.create(options);
    });

    it("should create a new employeeKRAScore", () => {
      assert.strictEqual(employeeKRAScoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKRAScoreCreated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKRAScoreCreated.weight, options.weight);
assert.strictEqual(employeeKRAScoreCreated.score, options.score);
assert.strictEqual(employeeKRAScoreCreated.rate, options.rate);
assert.strictEqual(employeeKRAScoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(employeeKRAScoreCreated.target, options.target);
assert.strictEqual(employeeKRAScoreCreated.kRA, options.kRA);
assert.strictEqual(employeeKRAScoreCreated.kPIGoal, options.kPIGoal);
assert.strictEqual(employeeKRAScoreCreated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(employeeKRAScoreCreated.sortOrder, options.sortOrder);
assert.strictEqual(employeeKRAScoreCreated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(employeeKRAScoreCreated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeKRAScore by ID", async () => {
      const retrieved = await thisService.get(employeeKRAScoreCreated._id);
      assert.strictEqual(retrieved._id, employeeKRAScoreCreated._id);
    });
  });

  describe("#update", () => {
    let employeeKRAScoreUpdated;
    const options = {"appraisalID":100,"secKPIID":100,"weight":100,"score":100,"rate":100,"weightedRate":100,"target":100,"kRA":"updated value","kPIGoal":"updated value","unitMeasurement":"updated value","sortOrder":100,"balancedScoreCard":"updated value","importanceRelevance":"updated value"};

    beforeEach(async () => {
      employeeKRAScoreUpdated = await thisService.update(employeeKRAScoreCreated._id, options);
    });

    it("should update an existing employeeKRAScore ", async () => {
      assert.strictEqual(employeeKRAScoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKRAScoreUpdated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKRAScoreUpdated.weight, options.weight);
assert.strictEqual(employeeKRAScoreUpdated.score, options.score);
assert.strictEqual(employeeKRAScoreUpdated.rate, options.rate);
assert.strictEqual(employeeKRAScoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(employeeKRAScoreUpdated.target, options.target);
assert.strictEqual(employeeKRAScoreUpdated.kRA, options.kRA);
assert.strictEqual(employeeKRAScoreUpdated.kPIGoal, options.kPIGoal);
assert.strictEqual(employeeKRAScoreUpdated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(employeeKRAScoreUpdated.sortOrder, options.sortOrder);
assert.strictEqual(employeeKRAScoreUpdated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(employeeKRAScoreUpdated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#delete", () => {
  let employeeKRAScoreDeleted;
    beforeEach(async () => {
      employeeKRAScoreDeleted = await thisService.remove(employeeKRAScoreCreated._id);
    });

    it("should delete a employeeKRAScore", async () => {
      assert.strictEqual(employeeKRAScoreDeleted._id, employeeKRAScoreCreated._id);
    });
  });
});