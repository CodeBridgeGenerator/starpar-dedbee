const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeKRAScore service", () => {
  let thisService;
  let yrEmployeeKRAScoreCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeKRAScore");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeKRAScore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"weight":23,"score":23,"rate":23,"weightedRate":23,"target":23,"kRA":"new value","kPIGoal":"new value","unitMeasurement":"new value","sortOrder":23,"balancedScoreCard":"new value","importanceRelevance":"new value"};

    beforeEach(async () => {
      yrEmployeeKRAScoreCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeKRAScore", () => {
      assert.strictEqual(yrEmployeeKRAScoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeKRAScoreCreated.secKPIID, options.secKPIID);
assert.strictEqual(yrEmployeeKRAScoreCreated.weight, options.weight);
assert.strictEqual(yrEmployeeKRAScoreCreated.score, options.score);
assert.strictEqual(yrEmployeeKRAScoreCreated.rate, options.rate);
assert.strictEqual(yrEmployeeKRAScoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(yrEmployeeKRAScoreCreated.target, options.target);
assert.strictEqual(yrEmployeeKRAScoreCreated.kRA, options.kRA);
assert.strictEqual(yrEmployeeKRAScoreCreated.kPIGoal, options.kPIGoal);
assert.strictEqual(yrEmployeeKRAScoreCreated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(yrEmployeeKRAScoreCreated.sortOrder, options.sortOrder);
assert.strictEqual(yrEmployeeKRAScoreCreated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(yrEmployeeKRAScoreCreated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeKRAScore by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeKRAScoreCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeKRAScoreCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeKRAScoreUpdated;
    const options = {"appraisalID":100,"secKPIID":100,"weight":100,"score":100,"rate":100,"weightedRate":100,"target":100,"kRA":"updated value","kPIGoal":"updated value","unitMeasurement":"updated value","sortOrder":100,"balancedScoreCard":"updated value","importanceRelevance":"updated value"};

    beforeEach(async () => {
      yrEmployeeKRAScoreUpdated = await thisService.update(yrEmployeeKRAScoreCreated._id, options);
    });

    it("should update an existing yrEmployeeKRAScore ", async () => {
      assert.strictEqual(yrEmployeeKRAScoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeKRAScoreUpdated.secKPIID, options.secKPIID);
assert.strictEqual(yrEmployeeKRAScoreUpdated.weight, options.weight);
assert.strictEqual(yrEmployeeKRAScoreUpdated.score, options.score);
assert.strictEqual(yrEmployeeKRAScoreUpdated.rate, options.rate);
assert.strictEqual(yrEmployeeKRAScoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(yrEmployeeKRAScoreUpdated.target, options.target);
assert.strictEqual(yrEmployeeKRAScoreUpdated.kRA, options.kRA);
assert.strictEqual(yrEmployeeKRAScoreUpdated.kPIGoal, options.kPIGoal);
assert.strictEqual(yrEmployeeKRAScoreUpdated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(yrEmployeeKRAScoreUpdated.sortOrder, options.sortOrder);
assert.strictEqual(yrEmployeeKRAScoreUpdated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(yrEmployeeKRAScoreUpdated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#delete", () => {
  let yrEmployeeKRAScoreDeleted;
    beforeEach(async () => {
      yrEmployeeKRAScoreDeleted = await thisService.remove(yrEmployeeKRAScoreCreated._id);
    });

    it("should delete a yrEmployeeKRAScore", async () => {
      assert.strictEqual(yrEmployeeKRAScoreDeleted._id, yrEmployeeKRAScoreCreated._id);
    });
  });
});