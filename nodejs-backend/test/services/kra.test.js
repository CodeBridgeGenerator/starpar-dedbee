const assert = require("assert");
const app = require("../../src/app");

describe("kra service", () => {
  let thisService;
  let kraCreated;

  beforeEach(async () => {
    thisService = await app.service("kra");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (kra)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"balancedScorecard":"new value","kpi":"new value","weight":23,"target":23,"actualAchievement":23,"rate":23,"weightedRate":23};

    beforeEach(async () => {
      kraCreated = await thisService.create(options);
    });

    it("should create a new kra", () => {
      assert.strictEqual(kraCreated.parId, options.parId);
assert.strictEqual(kraCreated.appraisorId, options.appraisorId);
assert.strictEqual(kraCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(kraCreated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(kraCreated.kpi, options.kpi);
assert.strictEqual(kraCreated.weight, options.weight);
assert.strictEqual(kraCreated.target, options.target);
assert.strictEqual(kraCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraCreated.rate, options.rate);
assert.strictEqual(kraCreated.weightedRate, options.weightedRate);
    });
  });

  describe("#get", () => {
    it("should retrieve a kra by ID", async () => {
      const retrieved = await thisService.get(kraCreated._id);
      assert.strictEqual(retrieved._id, kraCreated._id);
    });
  });

  describe("#update", () => {
    let kraUpdated;
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"balancedScorecard":"updated value","kpi":"updated value","weight":100,"target":100,"actualAchievement":100,"rate":100,"weightedRate":100};

    beforeEach(async () => {
      kraUpdated = await thisService.update(kraCreated._id, options);
    });

    it("should update an existing kra ", async () => {
      assert.strictEqual(kraUpdated.parId, options.parId);
assert.strictEqual(kraUpdated.appraisorId, options.appraisorId);
assert.strictEqual(kraUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(kraUpdated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(kraUpdated.kpi, options.kpi);
assert.strictEqual(kraUpdated.weight, options.weight);
assert.strictEqual(kraUpdated.target, options.target);
assert.strictEqual(kraUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraUpdated.rate, options.rate);
assert.strictEqual(kraUpdated.weightedRate, options.weightedRate);
    });
  });

  describe("#delete", () => {
  let kraDeleted;
    beforeEach(async () => {
      kraDeleted = await thisService.remove(kraCreated._id);
    });

    it("should delete a kra", async () => {
      assert.strictEqual(kraDeleted._id, kraCreated._id);
    });
  });
});