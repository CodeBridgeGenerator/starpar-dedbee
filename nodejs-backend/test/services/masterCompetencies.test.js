const assert = require("assert");
const app = require("../../src/app");

describe("masterCompetencies service", () => {
  let thisService;
  let masterCompetencyCreated;

  beforeEach(async () => {
    thisService = await app.service("masterCompetencies");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (masterCompetencies)");
  });

  describe("#create", () => {
    const options = {"departmentId":23,"name":"new value","description":"new value","weight":23,"rate":23,"weightedScore":23};

    beforeEach(async () => {
      masterCompetencyCreated = await thisService.create(options);
    });

    it("should create a new masterCompetency", () => {
      assert.strictEqual(masterCompetencyCreated.departmentId, options.departmentId);
assert.strictEqual(masterCompetencyCreated.name, options.name);
assert.strictEqual(masterCompetencyCreated.description, options.description);
assert.strictEqual(masterCompetencyCreated.weight, options.weight);
assert.strictEqual(masterCompetencyCreated.rate, options.rate);
assert.strictEqual(masterCompetencyCreated.weightedScore, options.weightedScore);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterCompetency by ID", async () => {
      const retrieved = await thisService.get(masterCompetencyCreated._id);
      assert.strictEqual(retrieved._id, masterCompetencyCreated._id);
    });
  });

  describe("#update", () => {
    let masterCompetencyUpdated;
    const options = {"departmentId":100,"name":"updated value","description":"updated value","weight":100,"rate":100,"weightedScore":100};

    beforeEach(async () => {
      masterCompetencyUpdated = await thisService.update(masterCompetencyCreated._id, options);
    });

    it("should update an existing masterCompetency ", async () => {
      assert.strictEqual(masterCompetencyUpdated.departmentId, options.departmentId);
assert.strictEqual(masterCompetencyUpdated.name, options.name);
assert.strictEqual(masterCompetencyUpdated.description, options.description);
assert.strictEqual(masterCompetencyUpdated.weight, options.weight);
assert.strictEqual(masterCompetencyUpdated.rate, options.rate);
assert.strictEqual(masterCompetencyUpdated.weightedScore, options.weightedScore);
    });
  });

  describe("#delete", () => {
  let masterCompetencyDeleted;
    beforeEach(async () => {
      masterCompetencyDeleted = await thisService.remove(masterCompetencyCreated._id);
    });

    it("should delete a masterCompetency", async () => {
      assert.strictEqual(masterCompetencyDeleted._id, masterCompetencyCreated._id);
    });
  });
});