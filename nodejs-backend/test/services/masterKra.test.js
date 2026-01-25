const assert = require("assert");
const app = require("../../src/app");

describe("masterKra service", () => {
  let thisService;
  let masterKraCreated;

  beforeEach(async () => {
    thisService = await app.service("masterKra");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (masterKra)");
  });

  describe("#create", () => {
    const options = {"departmentId":23,"balancedScorecard":"new value","kpi":"new value","weight":23,"target":23,"actualAchievement":23,"rate":23,"weightedRate":23};

    beforeEach(async () => {
      masterKraCreated = await thisService.create(options);
    });

    it("should create a new masterKra", () => {
      assert.strictEqual(masterKraCreated.departmentId, options.departmentId);
assert.strictEqual(masterKraCreated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(masterKraCreated.kpi, options.kpi);
assert.strictEqual(masterKraCreated.weight, options.weight);
assert.strictEqual(masterKraCreated.target, options.target);
assert.strictEqual(masterKraCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKraCreated.rate, options.rate);
assert.strictEqual(masterKraCreated.weightedRate, options.weightedRate);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterKra by ID", async () => {
      const retrieved = await thisService.get(masterKraCreated._id);
      assert.strictEqual(retrieved._id, masterKraCreated._id);
    });
  });

  describe("#update", () => {
    let masterKraUpdated;
    const options = {"departmentId":100,"balancedScorecard":"updated value","kpi":"updated value","weight":100,"target":100,"actualAchievement":100,"rate":100,"weightedRate":100};

    beforeEach(async () => {
      masterKraUpdated = await thisService.update(masterKraCreated._id, options);
    });

    it("should update an existing masterKra ", async () => {
      assert.strictEqual(masterKraUpdated.departmentId, options.departmentId);
assert.strictEqual(masterKraUpdated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(masterKraUpdated.kpi, options.kpi);
assert.strictEqual(masterKraUpdated.weight, options.weight);
assert.strictEqual(masterKraUpdated.target, options.target);
assert.strictEqual(masterKraUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKraUpdated.rate, options.rate);
assert.strictEqual(masterKraUpdated.weightedRate, options.weightedRate);
    });
  });

  describe("#delete", () => {
  let masterKraDeleted;
    beforeEach(async () => {
      masterKraDeleted = await thisService.remove(masterKraCreated._id);
    });

    it("should delete a masterKra", async () => {
      assert.strictEqual(masterKraDeleted._id, masterKraCreated._id);
    });
  });
});