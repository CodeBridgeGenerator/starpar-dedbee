const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeCompetenciesscore service", () => {
  let thisService;
  let yrEmployeeCompetenciesscoreCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeCompetenciesscore");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeCompetenciesscore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"competency":"new value","description":"new value","weight":23,"rate":23,"weightedRate":23,"remarks":"new value"};

    beforeEach(async () => {
      yrEmployeeCompetenciesscoreCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeCompetenciesscore", () => {
      assert.strictEqual(yrEmployeeCompetenciesscoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.competency, options.competency);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.description, options.description);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.weight, options.weight);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.rate, options.rate);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(yrEmployeeCompetenciesscoreCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeCompetenciesscore by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeCompetenciesscoreCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeCompetenciesscoreCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeCompetenciesscoreUpdated;
    const options = {"appraisalID":100,"competency":"updated value","description":"updated value","weight":100,"rate":100,"weightedRate":100,"remarks":"updated value"};

    beforeEach(async () => {
      yrEmployeeCompetenciesscoreUpdated = await thisService.update(yrEmployeeCompetenciesscoreCreated._id, options);
    });

    it("should update an existing yrEmployeeCompetenciesscore ", async () => {
      assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.competency, options.competency);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.description, options.description);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.weight, options.weight);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.rate, options.rate);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(yrEmployeeCompetenciesscoreUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
  let yrEmployeeCompetenciesscoreDeleted;
    beforeEach(async () => {
      yrEmployeeCompetenciesscoreDeleted = await thisService.remove(yrEmployeeCompetenciesscoreCreated._id);
    });

    it("should delete a yrEmployeeCompetenciesscore", async () => {
      assert.strictEqual(yrEmployeeCompetenciesscoreDeleted._id, yrEmployeeCompetenciesscoreCreated._id);
    });
  });
});