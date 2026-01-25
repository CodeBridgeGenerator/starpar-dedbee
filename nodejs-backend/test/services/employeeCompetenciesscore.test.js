const assert = require("assert");
const app = require("../../src/app");

describe("employeeCompetenciesscore service", () => {
  let thisService;
  let employeeCompetenciesscoreCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeCompetenciesscore");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeCompetenciesscore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"competency":"new value","description":"new value","weight":23,"rate":23,"weightedRate":23,"remarks":"new value"};

    beforeEach(async () => {
      employeeCompetenciesscoreCreated = await thisService.create(options);
    });

    it("should create a new employeeCompetenciesscore", () => {
      assert.strictEqual(employeeCompetenciesscoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeCompetenciesscoreCreated.competency, options.competency);
assert.strictEqual(employeeCompetenciesscoreCreated.description, options.description);
assert.strictEqual(employeeCompetenciesscoreCreated.weight, options.weight);
assert.strictEqual(employeeCompetenciesscoreCreated.rate, options.rate);
assert.strictEqual(employeeCompetenciesscoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(employeeCompetenciesscoreCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeCompetenciesscore by ID", async () => {
      const retrieved = await thisService.get(employeeCompetenciesscoreCreated._id);
      assert.strictEqual(retrieved._id, employeeCompetenciesscoreCreated._id);
    });
  });

  describe("#update", () => {
    let employeeCompetenciesscoreUpdated;
    const options = {"appraisalID":100,"competency":"updated value","description":"updated value","weight":100,"rate":100,"weightedRate":100,"remarks":"updated value"};

    beforeEach(async () => {
      employeeCompetenciesscoreUpdated = await thisService.update(employeeCompetenciesscoreCreated._id, options);
    });

    it("should update an existing employeeCompetenciesscore ", async () => {
      assert.strictEqual(employeeCompetenciesscoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeCompetenciesscoreUpdated.competency, options.competency);
assert.strictEqual(employeeCompetenciesscoreUpdated.description, options.description);
assert.strictEqual(employeeCompetenciesscoreUpdated.weight, options.weight);
assert.strictEqual(employeeCompetenciesscoreUpdated.rate, options.rate);
assert.strictEqual(employeeCompetenciesscoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(employeeCompetenciesscoreUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
  let employeeCompetenciesscoreDeleted;
    beforeEach(async () => {
      employeeCompetenciesscoreDeleted = await thisService.remove(employeeCompetenciesscoreCreated._id);
    });

    it("should delete a employeeCompetenciesscore", async () => {
      assert.strictEqual(employeeCompetenciesscoreDeleted._id, employeeCompetenciesscoreCreated._id);
    });
  });
});