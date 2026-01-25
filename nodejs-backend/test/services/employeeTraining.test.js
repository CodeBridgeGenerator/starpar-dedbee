const assert = require("assert");
const app = require("../../src/app");

describe("employeeTraining service", () => {
  let thisService;
  let employeeTrainingCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeTraining");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeTraining)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"trainingName":"new value"};

    beforeEach(async () => {
      employeeTrainingCreated = await thisService.create(options);
    });

    it("should create a new employeeTraining", () => {
      assert.strictEqual(employeeTrainingCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeTrainingCreated.trainingName, options.trainingName);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeTraining by ID", async () => {
      const retrieved = await thisService.get(employeeTrainingCreated._id);
      assert.strictEqual(retrieved._id, employeeTrainingCreated._id);
    });
  });

  describe("#update", () => {
    let employeeTrainingUpdated;
    const options = {"appraisalID":100,"trainingName":"updated value"};

    beforeEach(async () => {
      employeeTrainingUpdated = await thisService.update(employeeTrainingCreated._id, options);
    });

    it("should update an existing employeeTraining ", async () => {
      assert.strictEqual(employeeTrainingUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeTrainingUpdated.trainingName, options.trainingName);
    });
  });

  describe("#delete", () => {
  let employeeTrainingDeleted;
    beforeEach(async () => {
      employeeTrainingDeleted = await thisService.remove(employeeTrainingCreated._id);
    });

    it("should delete a employeeTraining", async () => {
      assert.strictEqual(employeeTrainingDeleted._id, employeeTrainingCreated._id);
    });
  });
});