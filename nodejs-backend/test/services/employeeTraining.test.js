const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeTraining service", () => {
  let thisService;
  let employeeTrainingCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeTraining");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeTraining)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"trainingName":"new value"};

    beforeEach(async () => {
      employeeTrainingCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeTraining", () => {
      assert.strictEqual(employeeTrainingCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeTrainingCreated.trainingName, options.trainingName);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeTraining by ID", async () => {
      const retrieved = await thisService.findById(employeeTrainingCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeTrainingCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"trainingName":"updated value"};

    it("should update an existing employeeTraining ", async () => {
      const employeeTrainingUpdated = await thisService.findByIdAndUpdate(
        employeeTrainingCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeTrainingUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeTrainingUpdated.trainingName, options.trainingName);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeTraining", async () => {
      const employeeTrainingDeleted = await thisService.remove(employeeTrainingCreated._id);
      assert.strictEqual(employeeTrainingDeleted._id.toString(), employeeTrainingCreated._id.toString());
    });
  });
});