const assert = require("assert");
const app = require("../../src/app");

describe("competencies service", () => {
  let thisService;
  let competencyCreated;

  beforeEach(async () => {
    thisService = await app.service("competencies");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (competencies)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"name":"new value","description":"new value","weight":23,"rate":23,"weightedScore":23};

    beforeEach(async () => {
      competencyCreated = await thisService.create(options);
    });

    it("should create a new competency", () => {
      assert.strictEqual(competencyCreated.parId, options.parId);
assert.strictEqual(competencyCreated.appraisorId, options.appraisorId);
assert.strictEqual(competencyCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(competencyCreated.name, options.name);
assert.strictEqual(competencyCreated.description, options.description);
assert.strictEqual(competencyCreated.weight, options.weight);
assert.strictEqual(competencyCreated.rate, options.rate);
assert.strictEqual(competencyCreated.weightedScore, options.weightedScore);
    });
  });

  describe("#get", () => {
    it("should retrieve a competency by ID", async () => {
      const retrieved = await thisService.get(competencyCreated._id);
      assert.strictEqual(retrieved._id, competencyCreated._id);
    });
  });

  describe("#update", () => {
    let competencyUpdated;
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"name":"updated value","description":"updated value","weight":100,"rate":100,"weightedScore":100};

    beforeEach(async () => {
      competencyUpdated = await thisService.update(competencyCreated._id, options);
    });

    it("should update an existing competency ", async () => {
      assert.strictEqual(competencyUpdated.parId, options.parId);
assert.strictEqual(competencyUpdated.appraisorId, options.appraisorId);
assert.strictEqual(competencyUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(competencyUpdated.name, options.name);
assert.strictEqual(competencyUpdated.description, options.description);
assert.strictEqual(competencyUpdated.weight, options.weight);
assert.strictEqual(competencyUpdated.rate, options.rate);
assert.strictEqual(competencyUpdated.weightedScore, options.weightedScore);
    });
  });

  describe("#delete", () => {
  let competencyDeleted;
    beforeEach(async () => {
      competencyDeleted = await thisService.remove(competencyCreated._id);
    });

    it("should delete a competency", async () => {
      assert.strictEqual(competencyDeleted._id, competencyCreated._id);
    });
  });
});