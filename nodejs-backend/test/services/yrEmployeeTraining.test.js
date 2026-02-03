const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeTraining service", () => {
  let thisService;
  let yrEmployeeTrainingCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeTraining");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeTraining)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"trainingName":"new value"};

    beforeEach(async () => {
      yrEmployeeTrainingCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeTraining", () => {
      assert.strictEqual(yrEmployeeTrainingCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeTrainingCreated.trainingName, options.trainingName);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeTraining by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeTrainingCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeTrainingCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeTrainingUpdated;
    const options = {"appraisalID":100,"trainingName":"updated value"};

    beforeEach(async () => {
      yrEmployeeTrainingUpdated = await thisService.update(yrEmployeeTrainingCreated._id, options);
    });

    it("should update an existing yrEmployeeTraining ", async () => {
      assert.strictEqual(yrEmployeeTrainingUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeTrainingUpdated.trainingName, options.trainingName);
    });
  });

  describe("#delete", () => {
  let yrEmployeeTrainingDeleted;
    beforeEach(async () => {
      yrEmployeeTrainingDeleted = await thisService.remove(yrEmployeeTrainingCreated._id);
    });

    it("should delete a yrEmployeeTraining", async () => {
      assert.strictEqual(yrEmployeeTrainingDeleted._id, yrEmployeeTrainingCreated._id);
    });
  });
});